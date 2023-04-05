const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses'); // bug #7 spelling
const correctMessage = document.getElementById('correct');
const greaterThanZeroMessage = document.getElementById('more-than-zero');
const lessThanHundredMessage = document.getElementById('less-than-hundred');

let targetNumber;
let attempts = 0; // bug #3 wrong assigment to const
let maxNumberOfAttempts = 5; // bug #4 wrong assignment to const

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  let guess = parseInt(guessInput.value, 10); // bug #9 let instead of const
  attempts = attempts + 1; 
  
  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; // bug #6 tooHighMessage instead of tooLowMessage
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
   // strech goal for one guess remaining
    if (remainingAttempts === 1) {
      numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guess remaining`;
    }
    // strech goal for < 0 and > 100 messages
    if (guess < 0) {
      tooLowMessage.style.display = 'none';
      numberOfGuessesMessage.style.display = 'none';
      greaterThanZeroMessage.style.display = '';
    }
    if (guess > 99) {
      tooHighMessage.style.display = 'none';
      numberOfGuessesMessage.style.display = 'none';
      lessThanHundredMessage.style.display = '';
    }
  }

  if (attempts === maxNumberOfAttempts) { // bug #2 wrong ====
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // bug #5 wrong <= before messages.length
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {  // bug #1 about wrong spelling
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  maxNumberOfAttempts = 5; // bug #7 wrong number
  attempts = 0 // CHECK

  // Enable the input and submit button
  submitButton.disabled = false; // bug #8 spelling disabled
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();