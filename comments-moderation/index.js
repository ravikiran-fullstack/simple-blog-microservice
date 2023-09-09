const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const moderateComment = (comment) => {
  console.log('comment', comment);
  setTimeout(() => {
    const { content } = comment;
    let status = 'Approved';
    if (content.toLowerCase().includes('orange')) {
      status = 'Rejected';
    }

    axios
      .post('http://localhost:7000/events', {
        typeOfEvent: 'CommentModerated',
        data: { ...comment, status },
      })
      .catch((err) => {
        console.log('error in comment moderation', err.message);
      });
  }, 3000);
};

app.post('/events', (req, res) => {
  console.log('/events', req.body);
  if (req.body.typeOfEvent === 'CommentCreated') {
    const comment = req.body.data;
    moderateComment(comment);
    res.status(200);
  }
});

app.listen(1111, () => {
  console.log('Comment Moderation service is running on PORT 1111');
});
