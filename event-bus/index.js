const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  console.log(req.body);
  const { typeOfEvent, data } = req.body;
  events.push(req.body);

  axios
    .post('http://localhost:4000/events', { typeOfEvent, data })
    .catch((err) => {
      console.log('4000', err.message);
    });

  // Comment Moderation service
  axios
    .post('http://localhost:1111/events', { typeOfEvent, data })
    .catch((err) => {
      console.error('1111', err.message);
    });

  // Comments micro-service
  axios
    .post('http://localhost:5000/events', { typeOfEvent, data })
    .catch((err) => {
      console.log(err.message);
    });

  // Query micro-service
  axios
    .post('http://localhost:9999/events', { typeOfEvent, data })
    .catch((err) => {
      console.log(err.message);
    });

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.json(events);
});

app.listen(7000, () => {
  console.log('listening on 7000');
});
