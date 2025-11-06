// DOM references
const buttons = document.querySelectorAll('.choice-btn');
const humanSpan = document.querySelector('#human-choice span');
const computerSpan = document.querySelector('#computer-choice span');
const message = document.querySelector('#msg');
const humanScoreEl = document.querySelector('#human-score span');
const computerScoreEl = document.querySelector('#computer-score span');
const resetBtn = document.querySelector('#reset-btn');

// Create a live message element inside the scoreboard dynamically
const scoreMessage = document.createElement('p');
scoreMessage.id = 'score-msg';
scoreMessage.classList.add('score-msg');
scoreMessage.textContent = "Let's play";
scoreMessage.style.marginTop = '0.5rem';
scoreMessage.style.fontWeight = 'bold';
document.querySelector('.scoreboard').insertBefore(scoreMessage, resetBtn);
// resetBtn.parentNode.insertBefore(scoreMessage, resetBtn); // the same as above


// Track scores
let humanScore = 0;
let computerScore = 0;

// Generate a random computer choice
function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Determine round result
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) return "tie";

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  return winConditions[humanChoice] === computerChoice ? "win" : "lose";
}

// Animate choices before revealing the final result
function animateChoices(humanChoice, computerChoice) {
  const options = ['rock', 'paper', 'scissors'];
  let i = 0;

  // Show thinking message
  message.textContent = '...thinking... 🤔';

  // Disable buttons during animation
  buttons.forEach(btn => (btn.disabled = true));

  // Change the text every 150ms
  const interval = setInterval(() => {
    humanSpan.textContent = options[i % 3];
    computerSpan.textContent = options[(i + 1) % 3];
    i++;
  }, 150);

  // Stop after 1 second and show the real choices
  setTimeout(() => {
    clearInterval(interval);
    humanSpan.textContent = humanChoice;
    computerSpan.textContent = computerChoice;
    showResult(humanChoice, computerChoice);

    // Re-enable buttons
    buttons.forEach(btn => (btn.disabled = false));
  }, 2000);
}

// Show result and update scores
function showResult(humanChoice, computerChoice) {
  const result = playRound(humanChoice, computerChoice);

  if (result === "tie") {
    message.textContent = `It's a tie! You both chose ${humanChoice} 🤝`;
  } else if (result === "win") {
    message.textContent = `You win! ${humanChoice} beats ${computerChoice} 🎉`;
    humanScore++;
  } else {
    message.textContent = `You lose! ${computerChoice} beats ${humanChoice} 😞`;
    computerScore++;
  }

  // Update live scores
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;

  // Update live scoreboard message
  updateScoreMessage();
}

// Live scoreboard status message
function updateScoreMessage() {
  if (humanScore > computerScore) {
    scoreMessage.textContent = `🔥 You're leading! Keep it up!`;
    scoreMessage.style.color = 'green';
  } else if (computerScore > humanScore) {
    scoreMessage.textContent = `💻 Computer is leading! Catch up!`;
    scoreMessage.style.color = 'red';
  } else {
    scoreMessage.textContent = `⚖️ It's a tie game so far!`;
    scoreMessage.style.color = 'orange';
  }
}

// Main game logic trigger
function updateGame(humanChoice) {
  const computerChoice = getComputerChoice();
  animateChoices(humanChoice, computerChoice); // Animate before showing result
}

// Event listeners for buttons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const humanChoice = btn.id;
    updateGame(humanChoice);
  });
});

// Reset Game
resetBtn.addEventListener('click', () => {
  humanScore = 0;
  computerScore = 0;
  humanSpan.textContent = '';
  computerSpan.textContent = '';
  humanScoreEl.textContent = humanScore;
  computerScoreEl.textContent = computerScore;
  message.textContent = 'Game reset! Start again 👊';
  scoreMessage.textContent = "Let's play!";
});

// --- The original logic before revised with UI ---

// // Get the computer choice
// function getComputerChoice() {
//   let randomNum = Math.floor(Math.random() * 3); // returns 0, 1, or 2

//   if (randomNum === 0) {
//     return "rock";
//   } else if (randomNum === 1) {
//     return "paper";
//   } else if (randomNum === 2) {
//     return "scissors";
//   }
// }

// // Get the human choice
// function getHumanChoice() {
//     let userInput = prompt("Enter your choice: rock, paper, or scissors", "rock");
//     return userInput.toLowerCase(); // make the input case-insensitive
// }


// // Play 5 rounds
// function playGame() 
//   {
//     // Declare score player variables
//     let humanScore = 0;
//     let computerScore = 0;

//     // A single round
//     function playRound(humanChoice, computerChoice) {
//       if (humanChoice === computerChoice) {
//         console.log(`It\'s a tie! Both you chose ${computerChoice} 🤝`);
//       } else if (
//         (humanChoice === 'rock' && computerChoice === 'scissors') || 
//         (humanChoice === 'paper' && computerChoice === 'rock') || 
//         (humanChoice === 'scissors' && computerChoice === 'paper')
//       ) {
//         console.log(`Hooray, you win! ${humanChoice} (your choice) beats ${computerChoice} 🎉`);
//         humanScore++;
//       } else {
//         console.log(`Oh dear, you lost! ${computerChoice} beats ${humanChoice} (your choice)😞`);
//         computerScore++;
//       }
//     }

//     // Loop the round 5 times
//     for (let i = 0; i < 5; i++) {
//       const humanSelection = getHumanChoice();       // prompt user each round
//       const computerSelection = getComputerChoice(); // random computer choice
//       playRound(humanSelection, computerSelection);
//       console.log(`Score after round ${i + 1}: Human ${humanScore} - Computer ${computerScore}`);
//     }

//     // Declare overall winner
//     if (humanScore > computerScore) {
//       console.log("🎉 Congratulations! You won the game!");
//     } else if (humanScore < computerScore) {
//       console.log("😞 You lost the game! Better luck next time.");
//     } else {
//       console.log("🤝 It's a tie overall!");
//     }
//   }

// playGame()