const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  console.log(req.body);
  if (req.body.typeOfEvent === 'PostCreated') {
    const { id, title } = req.body.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (req.body.typeOfEvent === 'CommentCreated') {
    const { commentId, content, postId } = req.body.data;
    posts[postId].comments.push({
      commentId,
      content,
    });
  }
  res.status(200).json(posts);
});

app.listen(6000, () => {
  console.log('listening on 6000');
});
