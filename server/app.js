/* eslint-disable prefer-destructuring */
const express = require('express');
const cors = require('cors');

const app = express();
const port = 8500;

app.use(cors())

let score = {};
let answer = '';
let order = 0;

app.get('/verify', (req, res) => {
  if (!score[req.query.name]) {
    score[req.query.name] = {};
  }
	if (score[req.query.name][answer] !== undefined) {
		res.send({
			error: 'Already answered, please wait for the next round'
		});
		return;
	}
  const right = req.query.answer === answer;
  if (right) {
    order++;
    const singleScore = order === 1 ? 3 : order === 2 ? 2 : 1;
		score[req.query.name][answer] = singleScore;
  }
  res.send({
		right,
		order
	});
});

app.get('/update', (req, res) => {
  answer = req.query.answer;
  order = 0;
  res.send('');
});

app.get('/score', (req, res) => {
  res.send(Object.fromEntries(Object.entries(score).map(([name, answers]) => [name, Object.values(answers).reduce((a, b) => a + b, 0)])));
});

app.get('/clear', (req, res) => {
  score = {};
  answer = '';
  order = 0;
  res.send('');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
