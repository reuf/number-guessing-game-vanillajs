/*
GAME FUNCTION:
- Player must guess a num between min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandNum(min, max),
    guessesLeft = 3;

// UI values:
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
  if (e.target.className === 'play-again'){
    window.location.reload();
  }
  console.log(1);
})

// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if its a winning number
  if (guess === winningNum){
    gameOver(true,`${winningNum} is correct, YOU WIN!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0){
      gameOver(false,`${guess} is incorrect, you have no more guesses left, YOU LOSE! The correct number was ${winningNum}.`)
    } else{
      guessInput.style.borderColor = 'red';
      guessInput.value = '';
      setMessage(`${guess} is incorrect, you have ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Set border color
  guessInput.style.borderColor = color;
  // Set message
  setMessage(msg, color);

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Winning num
function getRandNum(min, max){
  return Math.floor(Math.random() * (max-min+1)+min);
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}