#!/usr/bin/env node

//Import yargs for command line argument parsing.
const argv = require('yargs/yargs')(process.argv.slice(2))

  //Creating flags and default option (8 being default length of password).
  //Later edited in separate branch to add customizable options.
  .usage('Usage: $0 [options]')
  .help('h')
  .alias('h', 'help')
  .option('l', {
    alias: 'length',
    describe: 'Choose desired length of password.',
    type: 'number',
    default: 8,
  })
  .option('n', {
    alias: 'numbers',
    describe: 'Allow numbers to be included in password.',
    type: 'boolean',
    default: false,
  })
  .option('u', {
    alias: 'uppercase',
    describe: ' Allow uppercase letters to be included in password.',
    type: 'boolean',
    default: false,
  })
  .option('s', {
    alias: 'symbols',
    describe: 'Allow symbols to be included in password.',
    type: 'boolean',
    default: false,
  }).argv;

//Allowable default characters.
//Later edited in separate branch to add customizable option characters.
const characters = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '!@#$%^&*()_-+={}[]:;<>,.?/',
};

//Function to create random password using password length and allowable characters.
//Later edited in separate branch to add customizable option password options (Allows for default of lower case letters).
function generatePassword(length, useUppercase, useNumbers, useSymbols) {
  let availableCharacters = characters.lowercase;
  if (useUppercase) availableCharacters += characters.uppercase;
  if (useNumbers) {
    availableCharacters += characters.numbers;
  }
  if (useSymbols) {
    availableCharacters += characters.symbols;
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    password += availableCharacters.charAt(
      Math.floor(Math.random() * availableCharacters.length)
    );
  }
  return password;
}

//Gets password length from the command line and then Generates password.
//Later edited in separate branch to add customizable option characters to be included in command line.
const passwordLength = argv.length;
const includesUppercase = argv.uppercase;
const includesNumbers = argv.numbers;
const includesSymbols = argv.symbols;

//Validation for flag input
const allowedFlags = [
  'length',
  'l',
  'numbers',
  'n',
  'uppercase',
  'u',
  'symbols',
  's',
  'help',
  'h',
];
Object.keys(argv).forEach((flag) => {
  if (!allowedFlags.includes(flag) && flag !== '$0') {
    console.error(`Error: Must use allowed flags`);
    process.exit(1);
  }
});

//Validation for length of password
if (passwordLength < 8 || isNaN(passwordLength)) {
  console.error('Error: Length of password needs to be 8 character or more.');
  console.error('Error: Length of password needs to be a number.');
  process.exit(1);
}

const password = generatePassword(
  passwordLength,
  includesUppercase,
  includesNumbers,
  includesSymbols
);

// Displays randomly generated password in the console.
console.log(`Randomly generated password: ${password}`);
