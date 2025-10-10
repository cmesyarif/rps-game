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

console.log(getComputerChoice());

// Get the human choice
function getHumanChoice() {
    let choice = prompt("Enter your choice: rock, paper, or scissors", "rock");
    return choice.toLowerCase(); // make the input case-insensitive
}

console.log(getHumanChoice());
