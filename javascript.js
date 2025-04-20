
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
*/


let isAutoPlaying = false
let intervalId;

//const autoPlay = () => {

//};
function autoPlay() {
  if (!isAutoPlaying) {
     intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
  
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissor-button')
.addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame ('rock');
  } else if (event.key === 'p') { 
    playGame ('paper');
  } else if (event.key === 's') {
    playGame ('scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "you lose";
    } else if (computerMove === "paper") {
      result = "you win";
    } else if (computerMove === "scissors") {
      result = "ties";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "you win";
    } else if (computerMove === "paper") {
      result = "ties";
    } else if (computerMove === "scissors") {
      result = "you lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "ties";
    } else if (computerMove === "paper") {
      result = "you lose ";
    } else if (computerMove === "scissors") {
      result = "you win";
    }
  }

  if (result === "you win") {
    score.wins = score.wins + 1;
  } else if (result === "you lose") {
    score.losses += 1;
  } else if (result === "ties") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `you
  <img src="images/${playerMove}-emoji.png" class="move-icon" />
  <img src="images/${computerMove}-emoji.png" class="move-icon" />
  computer`;

  /*alert(
    `You picked ${playerMove}. Computer picked ${computerMove}. ${result}
    wins:${score.wins}, losses:${score.losses}, ties:${score.ties}`
  );*/

  //////// game move tracker history
  function movesHistory() {
    let containerMoves = document.getElementById("container-moves");
    let players = [{playerMove: playerMove}, {computerMove: computerMove}]
    let levizjet = document.createElement("li");
    levizjet.className = "levizjet";
    console.log(levizjet);
    levizjet.innerHTML =`User 🤵: ${players[0].playerMove} Computer 💻: ${players[1].computerMove}`;
    containerMoves.append(levizjet);
  }
  movesHistory()

}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `wins:${score.wins}, losses:${score.losses}, ties:${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;

  // return "rock";
  // return 5;
}
