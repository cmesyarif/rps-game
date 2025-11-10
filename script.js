// --- Score tracking ---
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';
let gameOver = false;

// --- Audio effects ---
const shuffleSound = new Audio('sounds/shuffle.mp3'); // looping shuffle sound during animation
shuffleSound.volume = 0.4;

// Optional sounds (add these files if you want extra feedback)
const winSound = new Audio('sounds/win.mp3');
const loseSound = new Audio('sounds/lose.mp3');
winSound.volume = 0.5;
loseSound.volume = 0.5;

// --- Generate a random computer choice ---
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// --- DOM references ---
const scoreInfo = document.getElementById('score-info');
const scoreMsg = document.getElementById('score-msg');
const playerChoicePlace = document.getElementById('player-choice');
const playerScorePlace = document.getElementById('player-score');
const computerChoicePlace = document.getElementById('computer-choice');
const computerScorePlace = document.getElementById('computer-score');
const choiceBtn = document.querySelectorAll('.choice-btn');
const modal = document.getElementById('endgameModal');
const overlay = document.getElementById('overlay');
const endgameMsg = document.getElementById('endgameMsg');
const restartBtn = document.getElementById('restartBtn');

// --- Core game logic for each round ---
function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    roundWinner = 'tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    playerScore++;
    roundWinner = 'player';
  } else {
    computerScore++;
    roundWinner = 'computer';
  }

  updateRoundInfo(roundWinner, playerChoice, computerChoice);
  updateScore();
  checkGameOver();
}

// --- UI updates after each round ---
function updateRoundInfo(roundWinner, playerChoice, computerChoice) {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!";
    scoreMsg.textContent = `${capitalize(playerChoice)} ties with ${computerChoice}`;
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = "You won this round!";
    scoreMsg.textContent = `${capitalize(playerChoice)} beats ${computerChoice}`;
  } else {
    scoreInfo.textContent = "You lost this round!";
    scoreMsg.textContent = `${capitalize(playerChoice)} is beaten by ${computerChoice}`;
  }
}

function updateScore() {
  playerScorePlace.textContent = `Player: ${playerScore}`;
  computerScorePlace.textContent = `Computer: ${computerScore}`;
}

// Capitalize first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// --- Check if the game is over ---
function checkGameOver() {
  if (playerScore === 5 || computerScore === 5) {
    gameOver = true;

    let winnerText = '';
    if (playerScore > computerScore) {
      winnerText = 'You won the game!';
      winSound.play();
    } else {
      winnerText = 'You lost the game!';
      loseSound.play();
    }

    openEndgameModal(winnerText);
  }
}

// --- Modal control functions ---
function openEndgameModal(message) {
  endgameMsg.textContent = message;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeEndgameModal() {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

// --- Animation before showing real choices ---
function animateChoices(callback) {
  const images = ['rock', 'paper', 'scissors'];
  let index = 0;

  // Start shuffle sound
  shuffleSound.currentTime = 0;
  shuffleSound.loop = true;
  shuffleSound.play();

  // Rapidly cycle through rock/paper/scissors images
  const interval = setInterval(() => {
    const img = images[index % images.length];
    playerChoicePlace.innerHTML = `<img src="images/${img}.png" width="80" alt="${img}" class="animate">`;
    computerChoicePlace.innerHTML = `<img src="images/${img}.png" width="80" alt="${img}" class="animate">`;
    index++;
  }, 150);

  // Stop animation after 1 second and show real result
  setTimeout(() => {
    clearInterval(interval);
    shuffleSound.pause();
    shuffleSound.currentTime = 0;
    callback(); // continue with actual choices
  }, 1000);
}

// --- Event listener for each choice button ---
choiceBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    if (gameOver) return; // disable clicks after game ends

    const playerChoice = btn.id;
    const computerChoice = getComputerChoice();

    // Play shuffle animation before showing final choices
    animateChoices(() => {
      playerChoicePlace.innerHTML = `<img src="images/${playerChoice}.png" alt="${playerChoice}" width="100">`;
      computerChoicePlace.innerHTML = `<img src="images/${computerChoice}.png" alt="${computerChoice}" width="100">`;
      playRound(playerChoice, computerChoice);
    });
  });
});

// --- Restart button handler ---
restartBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  gameOver = false;
  updateScore();
  scoreInfo.textContent = 'Choose Your Weapon!';
  scoreMsg.textContent = 'The first to reach 5 points wins the game';
  playerChoicePlace.textContent = '?';
  computerChoicePlace.textContent = '?';
  closeEndgameModal();
});
