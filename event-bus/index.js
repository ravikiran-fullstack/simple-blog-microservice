const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
  console.log(req.body);
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });

  axios.post('http://localhost:5000/events', event).catch((err) => {
    console.log(err.message);
  });

  // Query micro-service
  axios.post('http://localhost:6000/events', event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: 'OK' });
});

app.listen(7000, () => {
  console.log('listening on 7000');
});
