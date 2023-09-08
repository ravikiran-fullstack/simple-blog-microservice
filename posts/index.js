const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');

const posts = {}; // Object containing all posts
app.use(cors());
app.use(bodyParser.json());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  //console.log(req.headers);
  const { title } = req.body;
  const id = randomBytes(4).toString('hex');

  posts[id] = {
    id,
    title,
  };

  await axios.post('http://localhost:7000/events', {
    typeOfEvent: 'PostCreated',
    data: {
      id,
      title,
    },
  });

  res.status(201).json(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(4000, () => {
  console.log('listening on 4000');
});
