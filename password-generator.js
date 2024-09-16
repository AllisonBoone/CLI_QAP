#!/usr/bin/env node

//Import yargs for command line argument parsing.
const argv = require('yargs/yargs')(process.argv.slice(2))

  //Creating flags and default option (8 being default length of password).
  .usage('Usage: $0 [options')
  .help('h')
  .alias('h', 'help')
  .option('l', {
    alias: 'length',
    describe: 'Choose desired length of password',
    type: 'number',
    default: 8,
  }).argv;
