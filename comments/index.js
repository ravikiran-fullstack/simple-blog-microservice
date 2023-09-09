const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');

app.use(cors());
app.use(bodyParser.json());

const commentsByPostsId = {};

app.get('/posts/:id/comments', (req, res) => {
  const comments = commentsByPostsId[req.params.id] || [];
  res.status(200).json(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const { content } = req.body;
  const commentId = randomBytes(4).toString('hex');

  const comments = commentsByPostsId[req.params.id] || [];

  comments.push({ commentId, content, status: 'pending' });

  commentsByPostsId[req.params.id] = comments;

  await axios.post('http://localhost:7000/events', {
    typeOfEvent: 'CommentCreated',
    data: {
      commentId,
      content,
      postId: req.params.id,
      status: 'Pending',
    },
  });

  res.status(201).json(comments);
});

app.post('/events', async (req, res) => {
  console.log('Event Received:', req.body);

  const { typeOfEvent, data } = req.body;

  if (typeOfEvent === 'CommentModerated') {
    await axios
      .post('http://localhost:7000/events', {
        typeOfEvent: 'CommentUpdated',
        data,
      })
      .catch((error) => console.log('error in events route', error));
  }

  res.status(200);
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
