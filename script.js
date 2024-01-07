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

// Global variable for password customization
var options = {
  passwordLength: 0,
  userChoice: [],
}

// Function to prompt user for password options
function getPasswordOptions() {
  // Loop to find out the password length
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
  
  // Setting array of chosen options to the default 
  options.userChoice = [];
  
  // Function to ask the user and add character type to userChoice
  function askAndAdd(characters, question) {
    if (confirm(question)) {
      options.userChoice.push(characters);
      return true;
    }
    return false;
  }

  // Ask for each character type  
  var specChar = askAndAdd(specialCharacters, "Do you want to have special characters in your password?");
  var numChar = askAndAdd(numericCharacters, "Do you want to have numeric characters in your password?");
  var lowCase = askAndAdd(lowerCasedCharacters, "Do you want to have lowercase characters in your password?");
  var upCase = askAndAdd(upperCasedCharacters, "Do you want to have uppercase characters in your password?");  

  // Check if at least one option is selected
  if (!specChar && !numChar && !lowCase && !upCase) {
    alert("Password can not be generated! Choose at least one option.");
    getPasswordOptions();
  }  
}

// Function for getting a random element from an array
function getRandom(arr) {
  var random = arr[Math.floor(Math.random()*arr.length)];
  return random;
}

// Function to generate password with user input
function generatePassword() {
  // Generating password text
  var text = "";
  // Make sure that at least one character of each selected type is used
  for (i=0; i<options.userChoice.length; i++) {
    text += getRandom(options.userChoice[i])
  }
  // Generating the remaining characters according to the length of the password
  for (i=0; i<options.passwordLength-options.userChoice.length; i++) {
    randomArr = getRandom(options.userChoice);
    randomChar = getRandom(randomArr);
    text += randomChar
  }

// Fisher-Yates algorithm to shuffle the characters of the password
  // Convert the string into an array of characters and get the length of the array
  var shuffledText = text.split(""),
  shufTextLength = shuffledText.length;
    
    for(var i = shufTextLength - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i (inclusive)
        var tmp = shuffledText[i]; // Temporary variable to hold the value at index i
        shuffledText[i] = shuffledText[j]; // Swap the values at indices i and j
        shuffledText[j] = tmp; // Put the original value of shuffledText[i] into index j
    }

    return shuffledText.join(""); // Convert the array back to a string and return the shuffled string
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

