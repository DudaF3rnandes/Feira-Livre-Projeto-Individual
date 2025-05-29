// Pega os elementos da página que a gente vai mexer
const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const coinDisplay = document.querySelector(".coin-count");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector("#btnDashboard");
const timerDisplay = document.querySelector(".timer"); 

// Importa as perguntas de outro arquivo
import questions from "./questions.js";

// Variáveis pra controlar o que tá acontecendo no quiz
let currentIndex = 0; // qual pergunta tá sendo mostrada
let questionsCorrect = 0; // quantas o usuário acertou
let currentCoins = 0; // quantas moedas ele tem
let questionsIncorrect = 0; // quantas errou (nem tá usando por enquanto)
let respostasPorPergunta = []; // pra salvar se o usuário acertou ou errou cada pergunta

// Variáveis pro cronômetro
let startTime; // quando o quiz começou
let interval;  // vai guardar o intervalo do setInterval

// Quando clicar no botão de reiniciar (ou ir pro dashboard)
btnRestart.onclick = () => {
  content.style.display = "flex"; // mostra o quiz de novo
  contentFinish.style.display = "none"; // esconde a parte de "acabou"
  window.location.href = "dashboard1.html"; // manda pra página do dashboard

  // reseta tudo
  currentIndex = 0;
  questionsCorrect = 0;
  questionsIncorrect = 0;
  currentCoins = 0;

  loadQuestion(); // carrega a primeira pergunta de novo
};

// Função que roda quando a pessoa clica numa resposta
function nextQuestion(e) {
  const correta = e.target.getAttribute("data-correct") === "true"; // verifica se clicou na certa

  if (correta) {
    questionsCorrect++;
    currentCoins += 1500; // ganha 1500 moedas se acertar
    respostasPorPergunta.push(2); // marca que acertou
  } else {
    currentCoins = Math.max(0, currentCoins - 500); // perde 500 moedas se errar, mas nunca fica negativo
    respostasPorPergunta.push(1); // marca que errou
  }

  coinDisplay.textContent = `$${currentCoins}`; // atualiza na tela quanto de moedas ele tem

  // se ainda tem mais perguntas
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion(); // carrega a próxima
  } else {
    finish(); // se acabou, mostra o resultado final
  }
}

// Quando o quiz termina
function finish() {
  clearInterval(interval); // para o cronômetro

  const endTime = Date.now();
  const totalTime = Math.floor((endTime - startTime) / 1000); // tempo total em segundos
  const formattedTime = `${String(Math.floor(totalTime / 60)).padStart(2, '0')}:${String(totalTime % 60).padStart(2, '0')}`; // formata pra mm:ss

  // monta os dados pra salvar
  const data = {
    corretas: questionsCorrect,
    incorretas: questions.length - questionsCorrect,
    saldoFinal: currentCoins,
    moedasPerdidas: (questions.length - questionsCorrect) * 500,
    tempoResposta: totalTime,
    tempoFormatado: formattedTime,
    barracaEscolhida: localStorage.getItem("barracaEscolhida") || "Não definido",
    respostas: respostasPorPergunta
  };

  // salva no localStorage (pra usar depois na dashboard)
  localStorage.setItem("quizData", JSON.stringify(data));

  // se conseguiu juntar 10 mil moedas, mostra uma mensagem de parabéns
  if (currentCoins >= 10000) {
    textFinish.innerHTML = `
      <p style="text-align: center; font-size: 15px; font-weight: bold; color: green;">
        PARABÉNS, VOCÊ SE TORNOU UM FEIRANTE E CONSEGUE COMPRAR SUA BARRACA!
      </p>
      <p><img src="./assets/Gemini_Generated_Image_m843slm843slm843-removebg-preview.png" width="300" style="display:block; margin: 0 auto;"></p>
    `;
  } else {
    // se não conseguiu juntar 10 mil moedas, mostra que não conseguiu
    textFinish.innerHTML = `
      <p style="text-align: center; font-size: 15px; font-weight: bold; color: red;">
        INFELIZMENTE, VOCÊ NÃO SE TORNOU UM FEIRANTE E NÃO CONSEGUE COMPRAR SUA BARRACA!
      </p>
      <p><img src="./assets/Gemini_Generated_Image_76k3sw76k3sw76k3-removebg-preview.png" width="300" style="display:block; margin: 0 auto;"></p>
    `;
  }

  content.style.display = "none"; // esconde as perguntas
  contentFinish.style.display = "flex"; // mostra o resultado final
}

// Carrega a pergunta atual e mostra as opções de resposta
function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`; // atualiza qual pergunta tá sendo feita
  const item = questions[currentIndex];
  answers.innerHTML = ""; // limpa as alternativas anteriores
  question.innerHTML = item.question; // coloca o texto da pergunta na tela

  // cria os botões de resposta
  for (let i = 0; i < item.answers.length; i++) {
    const answer = item.answers[i];
    const div = document.createElement("div");

    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;

    answers.appendChild(div); // adiciona cada botão no HTML
  }

  // adiciona o evento de clique em cada botão
  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });

  // se for a primeira pergunta, começa o cronômetro
  if (currentIndex === 0) {
    startTime = Date.now();
    interval = setInterval(updateTimer, 1000); // atualiza o tempo a cada segundo
  }
}

// Atualiza o cronômetro na tela
function updateTimer() {
  const now = Date.now();
  const totalSeconds = parseInt((now - startTime) / 1000); // segundos totais desde o começo

  let minutes = parseInt(totalSeconds / 60); // pega os minutos
  let seconds = totalSeconds % 60; // pega os segundos restantes

  // Adiciona 0 na frente se for menor que 10
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timerDisplay.textContent = `${minutes}:${seconds}`; // mostra o tempo no formato mm:ss
}

// Começa o quiz carregando a primeira pergunta
loadQuestion();
