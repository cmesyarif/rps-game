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

a
