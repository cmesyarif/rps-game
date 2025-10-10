// Get the computer choice
function getComputerChoice() {
  let randomNum = Math.floor(Math.random() * 3); // gives 0, 1, or 2

  if (randomNum === 0) {
    return "rock";
  } else if (randomNum === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

// console.log(getComputerChoice());

// Get the human choice
function getHumanChoice() {
    let choice = prompt("Enter your choice: rock, paper, or scissors", "rock");
    return choice.toLowerCase(); // make the input case-insensitive
}

// console.log(getHumanChoice());

// Creating score variables
let humanScore = 0;
let computerScore = 0;

// Play a single round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log("It's a tie! Both chose " + humanChoice);
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    humanScore++;
  } else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    computerScore++;
  }
}

const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice();

playRound(humanSelection, computerSelection);
