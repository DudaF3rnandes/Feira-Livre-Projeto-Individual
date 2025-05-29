const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const coinDisplay = document.querySelector(".coin-count");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector("#btnDashboard");


import questions from "./questions.js";

let currentIndex = 0;
let questionsCorrect = 0;
let currentCoins = 0;
let questionsIncorrect = 0;
let respostasPorPergunta = []; // 2 = acerto, 1 = erro


btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";
  window.location.href = "dashboard1.html";
  currentIndex = 0;
  questionsCorrect = 0;
  questionsIncorrect = 0;
  currentCoins = 0;

  loadQuestion();
};




function nextQuestion(e) {
  const correta = e.target.getAttribute("data-correct") === "true";

  if (correta) {
    questionsCorrect++;
    currentCoins += 1500;
    respostasPorPergunta.push(2); // Acertou
  } else {
    currentCoins = Math.max(0, currentCoins - 500);
    respostasPorPergunta.push(1); // Errou
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
const data = {
  corretas: questionsCorrect,
  incorretas: questions.length - questionsCorrect,
  saldoFinal: currentCoins,
  moedasPerdidas: (questions.length - questionsCorrect) * 500,
  tempoResposta: Math.floor(Math.random() * 500 + 500),
  barracaEscolhida: localStorage.getItem("barracaEscolhida") || "Não definido",
  respostas: respostasPorPergunta
};

localStorage.setItem("quizData", JSON.stringify(data));


  if (currentCoins >= 10000) {
    textFinish.innerHTML = `
      <p style="text-align: center; font-size: 15px; font-weight: bold; color: green;">
        PARABÉNS, VOCÊ SE TORNOU UM FEIRANTE E CONSEGUE COMPRAR SUA BARRACA!
      </p>
      <p><img src="./assets/Gemini_Generated_Image_m843slm843slm843-removebg-preview.png" width="300" style="display:block; margin: 0 auto;"></p>
    `;
  } else {
    textFinish.innerHTML = `
      <p style="text-align: center; font-size: 15px; font-weight: bold; color: red;">
        INFELIZMENTE, VOCÊ NÃO SE TORNOU UM FEIRANTE E NÃO CONSEGUE COMPRAR SUA BARRACA!
      </p>
      <p><img src="./assets/Gemini_Generated_Image_76k3sw76k3sw76k3-removebg-preview.png" width="300" style="display:block; margin: 0 auto;"></p>
    `;
  }

  content.style.display = "none";
  contentFinish.style.display = "flex";
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