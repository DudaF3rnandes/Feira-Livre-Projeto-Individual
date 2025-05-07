const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const coinDisplay = document.querySelector(".coin-count");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");

import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;
let currentCoins = 0; 


btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

function nextQuestion(e) {
  if (e.target.getAttribute("data-correct") === "true") {
    questionsCorrect++;
    currentCoins+= 1500
  }  else {
    currentCoins = Math.max(0, currentCoins - 500); // nunca negativo //pesquisado a fundo
  }
 
  coinDisplay.textContent = `$${currentCoins}`;
  
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
}

function finish() {

  if (questionsCorrect >= 5) {
     textFinish.innerHTML = `PARABÉNS, VOCÊ SE TORNOU UM FEIRANTE E CONSEGUE COMPRAR SUA BARRACA!`
     content.style.display = "none";
     contentFinish.style.display = "flex";
  } else {
    textFinish.innerHTML = `INFELIZMENTE, VOCÊ NÃO SE TORNOU UM FEIRANTE E NÃO CONSEGUE COMPRAR SUA BARRACA!`
     content.style.display = "none";
     contentFinish.style.display = "flex";
  }
 
  //textFinish.innerHTML = `você acertou ${questionsCorrect} de ${questions.length}`;

}

function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  for (let i = 0; i < item.answers.length; i++) {
    const answer = item.answers[i];
    const div = document.createElement("div");
  
    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;
  
    answers.appendChild(div);
  }
  

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
