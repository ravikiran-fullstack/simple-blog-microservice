import { useState, useContext } from 'react';
import axios from 'axios';

import { PostContext } from './App';

const PostCreate = () => {
  const { updatePosts } = useContext(PostContext);

  const [title, setTitle] = useState('');

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/posts', {
        title,
      });
      console.log(response);
      setTitle('');
      updatePosts(Math.random() * 100000000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={submitPost}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
          />
        </div>
        <div className="form-group mt-2">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
