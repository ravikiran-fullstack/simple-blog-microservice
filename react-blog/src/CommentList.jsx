import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PostContext } from './App';

// eslint-disable-next-line react/prop-types
const CommentList = ({ postId }) => {
  const { postsChanged } = useContext(PostContext);

  console.log(postId);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async (postId) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${postId}/comments`
        );
        console.log('response', response);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments(postId);
  }, [postId, postsChanged]);
  return (
    comments.length !== 0 && (
      <div>
        <h6>CommentList</h6>
        <ul>
          {comments.map((comment) => (
            <li key={comment.commentId}>{comment.content}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default CommentList;
