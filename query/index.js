const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (event) => {
  if (event.typeOfEvent === 'PostCreated') {
    console.log('handleEvent PostCreated', event);
    const { id, title } = event.data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }

  if (event.typeOfEvent === 'CommentCreated') {
    console.log('handleEvent CommentCreated', event);
    const { commentId, content, postId, status } = event.data;
    posts[postId].comments.push({
      commentId,
      content,
      status,
    });
  }

  if (event.typeOfEvent === 'CommentUpdated') {
    console.log('handleEvent CommentUpdated', event);
    const { commentId, content, postId, status } = event.data;
    const updatedComments = posts[postId].comments.map((comment) => {
      if (comment.commentId === commentId) {
        comment.status = status;
      }
      return comment;
    });

    posts[postId].comments = updatedComments;
  }
};

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.post('/events', (req, res) => {
  console.log(req.body);
  handleEvent(req.body);
  res.status(200).json(posts);
});

app.listen(9999, async () => {
  console.log('listening on 9999');
  try {
    const res = await axios.get('http://localhost:7000/events');

    for (let event of res.data) {
      console.log('Processing event: ', event);

      handleEvent(event);
    }
  } catch (error) {
    console.log(error.message);
  }
});
