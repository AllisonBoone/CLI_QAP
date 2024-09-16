#!/usr/bin/env node

//Import yargs for command line argument parsing.
const argv = require('yargs/yargs')(process.argv.slice(2))

  //Creating flags and default option (8 being default length of password).
  //Later edited in separate branch to add customizable options.
  .usage('Usage: $0 [options')
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
//Later Later edited in separate branch to add customizable option characters.
const characters = {
  lowerCase: 'abcdefghijklmnopqrstuvwxyz',
  upperCase: 'ABCDEFGHIJKLNMOPQRSTUVWXYZ',
  numbers: '1234567890',
  symbols: '!@#$%^&*()_-+={}[]:;<>,.?/',
};

//Function to create random password using password length and allowable characters.
function generatedPassword(length) {
  let password = '';
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

//Gets password length from the command line and then Generates password.
const passwordLength = argv.length;
const password = generatedPassword(passwordLength);

// Displays randomly generated password in the console.
console.log(`Randomly generated password: ${password}`);
