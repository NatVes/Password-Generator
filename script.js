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

var options = {
  passwordLength: 0,
  userChoice: [],
}

// Function to prompt user for password options
function getPasswordOptions() {
  
  do {
    options.passwordLength = parseInt(prompt("How many characters would you like to have in your password?"));
    
    if (isNaN(options.passwordLength)) {
      alert("Please enter a valid number.");
    } else if (options.passwordLength < 8) {
      alert("The number of characters must be more than 8.");
    } else if (options.passwordLength > 128) {
      alert("The number of characters must be less than 128.");
    } 
  } while (isNaN(options.passwordLength) || options.passwordLength < 8 || options.passwordLength > 128);
  
  options.userChoice = [];
  let specChar = false;
  let request = confirm("Do you want to have special characters in your password?");
  if (request) {
    specChar = true;
    options.userChoice.push(specialCharacters);
  }   
  
  let numChar = false;
  request = confirm("Do you want to have numeric characters in your password?")
  if (request) {
    numChar = true;
    options.userChoice.push(numericCharacters);
  }   

  let lowCase = false;
  request = confirm("Do you want to have lowercase characters in your password?")
  if (request) {
    lowCase = true;
    options.userChoice.push(lowerCasedCharacters);
  }  

  let upCase = false;
  request = confirm("Do you want to have uppercase characters in your password?")
  if (request) {
    upCase = true;
    options.userChoice.push(upperCasedCharacters);
  } 

  if (!specChar && !numChar && !lowCase && !upCase) {
    alert("Password can not be generated! Choose at least one option.")
  }    
}


// Function for getting a random element from an array
function getRandom(arr) {
  let random = arr[Math.floor(Math.random()*arr.length)];
  return random;
}

// Function to generate password with user input
function generatePassword() {
  var text = "";

  for (i=0; i<options.userChoice.length; i++) {
    text += getRandom(options.userChoice[i])
  }

  for (i=0; i<options.passwordLength-options.userChoice.length; i++) {
    randomArr = getRandom(options.userChoice);
    randomChar = getRandom(randomArr);
    text += randomChar
  }

  var shuffledText = text.split(""),
  shufTextLength = shuffledText.length;

    for(var i = shufTextLength - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = shuffledText[i];
        shuffledText[i] = shuffledText[j];
        shuffledText[j] = tmp;
    }

    return shuffledText.join("");    
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  getPasswordOptions();
  var password = generatePassword();
  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

