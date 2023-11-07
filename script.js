const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
];

let words = [];
let wordIndex = 0;
let startTime = Date.now();

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

document.getElementById("start").addEventListener("click", () => {
  //quotes 배열에서 인용문 무작위 선택
  const quoteIndex = Math.floor(Math.random() * quotes.length); //인덱스에 들어갈 수라서 0~6 난수
  const quote = quotes[quoteIndex];
  //플레이어가 현재 입력하고 있는 단어를 추적할 수 있도록 quote를 words배열로 변환
  words = quote.split(" ");
  //플레이어는 첫번째 단어부터 시작하므로, wordIndex는 0으로
  wordIndex = 0;

  //·UI설정 부분·

  //span 요소 안에 각 단어를 포함하고 있는, spanWords 배열을 만듭니다.
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  console.log(spanWords);

  //배열을 join하여 quoteElement의 innerHTML로 갱신할 때 사용할 문자열을 만듭니다
  quoteElement.innerHTML = spanWords.join("");

  //첫 번째 span 요소의 classname을 highlight로 설정하여 노란색을 강조
  quoteElement.childNodes[0].className = "highlight";
  //innerText를 ''로 설정하여 messageElement로 정리
  messageElement.innerText = "";

  //·텍스트 박스 설정·
  //typedValueElement의 현재 value를 지우기
  typedValueElement.value = "";
  //focus를 typedValueElement로 설정
  typedValueElement.focus();

  StartTime = new Date().getTime();
});

typedValueElement.addEventListener("input", (e) => {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex && words.length - 1) {
    //1. 인용문 완성된 경우
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    //2. 단어 완성된 경우
    typedValueElement.value = "";
    wordIndex++;
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    console.log(typedValueElement);
    typedValueElement.className = "";
    console.log(typedValueElement);
  } else {
    //error state
    typedValueElement.className = "error";
  }
});
