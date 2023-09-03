const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');

app.use(cors());
app.use(bodyParser.json());

const commentsByPostsId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostsId[req.params.id] || [];
  res.status(200).json(comments);
});

app.post('/posts/:id/comments', (req, res) => {
  const { content } = req.body;
  const id = randomBytes(4).toString('hex');

  const comments = commentsByPostsId[req.params.id] || [];

  comments.push({ id, content });

  commentsByPostsId[req.params.id] = comments;

  res.status(201).json(comments);
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
