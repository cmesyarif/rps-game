// Step 1: Get the computer choice
function getComputerChoice() {
  let randomNum = Math.floor(Math.random() * 3); // returns 0, 1, or 2

  if (randomNum === 0) {
    return "rock";
  } else if (randomNum === 1) {
    return "paper";
  } else if (randomNum === 2) {
    return "scissors";
  }
}

// Step 2: Get the human choice
function getHumanChoice() {
    let userInput = prompt("Enter your choice: rock, paper, or scissors", "rock");
    return userInput.toLowerCase(); // make the input case-insensitive
}

// Step 3: Declare the score player variables
let humanScore = 0;
let computerScore = 0;

// Step 4: Play a single round.
// The rules are: rock beats scissors, scissors beat paper, and paper beats rock.
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`It\'s a tie! Both you chose ${computerChoice} 🤝`);
  } else if (
    (humanChoice === 'rock' && computerChoice === 'scissors') || 
    (humanChoice === 'paper' && computerChoice === 'rock') || 
    (humanChoice === 'scissors' && computerChoice === 'paper')
  ) {
    console.log(`Hooray, you win! ${humanChoice} (your choice) beats ${computerChoice} 🎉`);
    humanScore++;
  } else {
    console.log(`Oh dear, you lost! ${computerChoice} beats ${humanChoice} (your choice)😞`);
    computerScore++;
  }
}

/* const humanSelection = getHumanChoice();
const computerSelection = getComputerChoice(); */

/* playRound(humanSelection, computerSelection);
console.log(`Your score: ${humanScore} and Computer score: ${computerScore}`); */

// Step 5: Play the entire game (5 rounds)
function playGame() {
    // Loop the round 5 times
    for (let i = 0; i < 5; i++) {
      const humanSelection = getHumanChoice();       // prompt user each round
      const computerSelection = getComputerChoice(); // random computer choice
      playRound(humanSelection, computerSelection);
      console.log(`Score after round ${i + 1}: Human ${humanScore} - Computer ${computerScore}`);
    }

    // Declare overall winner
    if (humanScore > computerScore) {
      console.log("🎉 Congratulations! You won the game!");
    } else if (humanScore < computerScore) {
      console.log("😞 You lost the game! Better luck next time.");
    } else {
      console.log("🤝 It's a tie overall!");
    }
  }

// Alternative: Step 3, 4, and 5 can be combined into a function
/* function playGame() 
  {
    // Declare score player variables
    let humanScore = 0;
    let computerScore = 0;

    // A single round
    function playRound(humanChoice, computerChoice) {
      if (humanChoice === computerChoice) {
        console.log(`It\'s a tie! Both you chose ${computerChoice} 🤝`);
      } else if (
        (humanChoice === 'rock' && computerChoice === 'scissors') || 
        (humanChoice === 'paper' && computerChoice === 'rock') || 
        (humanChoice === 'scissors' && computerChoice === 'paper')
      ) {
        console.log(`Hooray, you win! ${humanChoice} (your choice) beats ${computerChoice} 🎉`);
        humanScore++;
      } else {
        console.log(`Oh dear, you lost! ${computerChoice} beats ${humanChoice} (your choice)😞`);
        computerScore++;
      }
    }

    // Loop the round 5 times
    for (let i = 0; i < 5; i++) {
      const humanSelection = getHumanChoice();       // prompt user each round
      const computerSelection = getComputerChoice(); // random computer choice
      playRound(humanSelection, computerSelection);
      console.log(`Score after round ${i + 1}: Human ${humanScore} - Computer ${computerScore}`);
    }

    // Declare overall winner
    if (humanScore > computerScore) {
      console.log("🎉 Congratulations! You won the game!");
    } else if (humanScore < computerScore) {
      console.log("😞 You lost the game! Better luck next time.");
    } else {
      console.log("🤝 It's a tie overall!");
    }
  } */

playGame()