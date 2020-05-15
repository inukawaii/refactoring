const statement = require('./statement.js');
const fs = require('fs');

const invoices = JSON.parse(fs.readFileSync('./invoices.json', 'utf8'));
const plays = JSON.parse(fs.readFileSync('./plays.json', 'utf8'));

const expectedWords = ['Statement for BigCo', ' Hamlet: $650.00 (55 seats)', ' As You Like It: $580.00 (35 seats)', ' Othello: $500.00 (40 seats)', 'Amount owed is $1,730.00', 'You earned 47 credits'];
const expected = expectedWords.join('\n') + '\n';
const actual = statement(invoices[0], plays);

const result = expected == actual;

console.log(result ? '\x1b[32m' : '\x1b[31m', result ? 'OK' : 'NG');