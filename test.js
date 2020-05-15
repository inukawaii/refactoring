const statement = require('./statement.js');
const fs = require('fs');

const invoices = JSON.parse(fs.readFileSync('./invoices.json', 'utf8'));
const plays = JSON.parse(fs.readFileSync('./plays.json', 'utf8'));

function notify(expected, actual) {
  const result = expected == actual;
  console.log(result ? '\x1b[32m' : '\x1b[31m', result ? 'OK' : 'NG');
}

// plainText
const expectedWords = ['Statement for BigCo', ' Hamlet: $650.00 (55 seats)', ' As You Like It: $580.00 (35 seats)', ' Othello: $500.00 (40 seats)', 'Amount owed is $1,730.00', 'You earned 47 credits'];
const expected = expectedWords.join('\n') + '\n';
const actual = statement.statement(invoices[0], plays);
notify(expected, actual);

// html
const expectedWordsForHtml = ['<h1>Statement for BigCo</h1>', '<table>', '<tr><th>play</th><th>seats</th><th>cost></th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>', ' <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>', ' <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>', '</table>', '<p>Amount owed is <em>$1,730.00</em></p>', '<p>Your earned <em>47</em> credits</p>'];
const expectedForHtml = expectedWordsForHtml.join('\n') + '\n';
const actualForHtml = statement.htmlStatement(invoices[0], plays);
notify(expectedForHtml, actualForHtml);