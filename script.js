const quotes = [
  "ab bc cd",
  "ab bc cd",
  "ab bc cd",
  "ab bc cd",
  "ab bc cd",
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
  wordIndex = 0;

  //·UI설정 부분·
  //span 요소 안에 각 단어를 포함하고 있는, spanWords 배열을 만듭니다.
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  //배열을 join하여 quoteElement의 innerHTML로 갱신할 때 사용할 문자열을 만듭니다
  quoteElement.innerHTML = spanWords.join("");
  //첫 번째 span 요소의 classname을 highlight로 설정하여 노란색을 강조
  quoteElement.childNodes[0].className = "highlight";
  messageElement.innerText = "";
  //·텍스트 박스 설정·
  typedValueElement.value = "";
  typedValueElement.focus();
  StartTime = new Date().getTime();
});

function eventListener(e) {
  const currentWord = words[wordIndex];
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex == words.length - 1) {
    const elapsedTime = new Date().getTime() - startTime;
    const message = `CONGRATULATIONS! You finished in ${
      elapsedTime / 1000
    } seconds.`;
    messageElement.innerText = message;
    //완성할 때 input 이벤트 리스너를 끄고, 버튼을 클릭하면 다시 키기(추가)
    e.preventDefault();
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    typedValueElement.value = "";
    wordIndex++;
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    typedValueElement.className = "";
  } else {
    typedValueElement.className = "error";
  }
}

// const  option =  {

//   once : true
// };

function eventListener(e){
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex == words.length - 1) {
      const elapsedTime = new Date().getTime() - startTime;
      const message = `CONGRATULATIONS! You finished in ${
        elapsedTime / 1000
      } seconds.`;
      messageElement.innerText = message;
      
    } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
      typedValueElement.value = "";
      wordIndex++;
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = "";
      }
      quoteElement.childNodes[wordIndex].className = "highlight";
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = "";
    } else {
      typedValueElement.className = "error";
    }
  }
typedValueElement.addEventListener("input", (e)=>
eventListener(e));
typedValueElement.removeEventListener("'input", (e)=>
eventListener(e));  

