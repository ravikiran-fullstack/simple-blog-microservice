import { useContext, useState } from 'react';
import axios from 'axios';
import { PostContext } from './App';

// eslint-disable-next-line react/prop-types
const CommentCreate = ({ postId }) => {
  const { updatePosts } = useContext(PostContext);
  const [content, setContent] = useState('');
  const submitComment = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/comments`,
        { content }
      );
      console.log(response.data);
      setContent('');
      updatePosts(Math.random() * 1000000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="" onSubmit={submitComment}>
        <label htmlFor="content">New Comment</label>
        <div className="form-control">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="New Comment"
          />
        </div>
        <button className="btn btn-primary m-3">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
