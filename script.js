// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  let passwordLength;  
  do {
    passwordLength = parseInt(prompt("How many characters would you like to have in your password?"));
    
    if (isNaN(passwordLength)) {
      alert("Please enter a valid number.");
    } else if (passwordLength < 8) {
      alert("The number of characters must be more than 8.");
    } else if (passwordLength > 128) {
      alert("The number of characters must be less than 128.");
    } 
  } while (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128);
  
  console.log(passwordLength)

  let userChoice = [];

  let specChar = false;
  let request = confirm("Do you want to have special characters in your password?");
  if (request) {
    specChar = true;
    userChoice.push(specialCharacters);
  } 

  console.log(specChar)
  console.log(userChoice)

  let numChar = false;
  request = confirm("Do you want to have numeric characters in your password?")
  if (request) {
    numChar = true;
    userChoice.push(numericCharacters);
  } 

  console.log(numChar)

  let lowCase = false;
  request = confirm("Do you want to have lowercase characters in your password?")
  if (request) {
    lowCase = true;
    userChoice.push(lowerCasedCharacters);
  }

  console.log(lowCase)

  let upCase = false;
  request = confirm("Do you want to have uppercase characters in your password?")
  if (request) {
    upCase = true;
    userChoice.push(upperCasedCharacters);
  }

  console.log(upCase)

  if (!specChar && !numChar && !lowCase && !upCase) {
    alert("Password can not be generated! Choose at least one option.")
  }
  return userChoice;
}


// Function for getting a random element from an array
function getRandom(arr) {
  let random = arr[Math.floor(Math.random()*arr.length)];
  return random;
}

// Function to generate password with user input
function generatePassword() {
  text = "";
  for (i=0; i<passwordLength; i++) {
    randomArr = getRandom(userChoice);
    randomChar = getRandom(randomArr);
    text += randomChar

  }
  console.log(text)
  return text
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

var start = confirm('Would you like to generate new password?');

if (start) {
  getPasswordOptions();
} else {
    alert('Try again!');
}