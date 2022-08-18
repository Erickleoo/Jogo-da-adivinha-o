let inputName = document.querySelector(".input-name");
let buttonStart = document.querySelector(".button-start");
let namePerson = document.querySelector(".name-person");
let buttonPlay = document.querySelector(".game-start");
let numberInput = document.querySelector(".number");
let resultadoNumeros = document.querySelector(".resultado-numeros");
let attemptsGame = document.querySelector(".resultado-tentativas");
let buttonPlayAgain = document.querySelector(".play-again");

// Função pra desabailitar os botões começar caso o usuário não digite nada!
function disabledButton() {
  if (inputName.value.length == 0) {
    buttonStart.disabled = true;
    buttonStart.style.backgroundColor = "#7c7f82";
  }
  else {
    buttonStart.disabled = false;
    buttonStart.style.backgroundColor = "#1180E6";
  }
  if (numberInput.value.length == 0) {
    buttonPlay.disabled = true;
    buttonPlay.style.backgroundColor = "#7c7f82";
  }
  else {
    buttonPlay.disabled = false;
    buttonPlay.style.backgroundColor = "#f2890d";
  }
};

// Função pra mostrar o nome do usuário !
const displayName = () => {
  namePerson.innerHTML = `<b>${inputName.value}</b>`;
  inputName.disabled = true;
  selectValues();
};

// função que seleciona os valores escolhido pelo o usuário!
let result;
function selectValues() {
  let select = document.querySelector(".intervalo");
  let value = select.options[select.selectedIndex].value;

  switch (value) {
    case "option1":
      result = generateSecretNumber.option1();
      break;
    case "option2":
      result = generateSecretNumber.option2();
      break;
    case "option3":
      result = generateSecretNumber.option3();
      break;

    default:
      break;
  }
  select.disabled = true;
};

// Objeto com funções para calcular a opção escolhida pelo usuário
const generateSecretNumber = {
  option1: () => {
    let min = 1;
    let max = 10;
    let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return secretNumber;
  },
  option2: () => {
    let min = 1;
    let max = 100;
    let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return secretNumber;
  },
  option3: () => {
    let min = 1;
    let max = 200;
    let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return secretNumber;
  }
};

// Função que informa se o numero é maior menor ou se o usuário errou!
function gameOver(situation) {
  switch (situation) {
    case "Acertou":
      resultadoNumeros.innerHTML = "<b>Parabéns, você conseguiu adivinhar!</b>";
      resultadoNumeros.classList.add("acertou");
      break;
    case 'Numero maior':
      resultadoNumeros.innerHTML = "<b>O número digitado é maior!</b>";
      break;
    case 'Numero menor':
      resultadoNumeros.innerHTML = "<b>O número digitado é menor!</b>";
      break;
    case 'Game Over':
      resultadoNumeros.innerHTML = "<b>Game Over!</b>";
      resultadoNumeros.classList.add("errou");
      break;

    default:
      break;
  }
};

// Função que faz o jogo funcionar mostrando os resultados!
let qntAttempts = 3;
function play() {
  attemptsGame.innerHTML = qntAttempts;

  if (numberInput.value == result) {
    situation = "Acertou";
    gameOver(situation);
    buttonPlayAgain.style.display = "block";
    buttonPlay.style.display = "none";
  }
  else if (numberInput.value > result) {
    situation = "Numero maior";
    qntAttempts -= 1;
    gameOver(situation);
  }
  else if (numberInput.value < result) {
    situation = "Numero menor";
    qntAttempts -= 1;
    gameOver(situation);
  }
  numberInput.value = "";
  attemptsGame.innerHTML = `Você ainda tem ${qntAttempts} tentativas!`;
  if (qntAttempts == 0) {
    situation = "Game Over";
    attemptsGame.innerHTML = `Você errou, o número era <b>${result}!</b>`;
    gameOver(situation);
    buttonPlayAgain.style.display = "block";
    buttonPlay.style.display = "none";
  }
};

// Função pra recarregar a página!
function refresh() {
  window.parent.location = window.parent.location.href;
};

numberInput.addEventListener("input", disabledButton);
inputName.addEventListener("input", disabledButton);
buttonStart.addEventListener("click", displayName);
buttonPlay.addEventListener("click", play);
buttonPlayAgain.addEventListener("click", refresh);
