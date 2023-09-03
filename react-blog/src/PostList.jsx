import axios from 'axios';
import { useState, useEffect } from 'react';

import CommentList from './CommentList';
import CommentCreate from './CommentCreate';

const PostList = () => {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/posts');
        setAllPosts(Object.values(response.data));
      } catch (error) {
        console.log(error);
        setAllPosts([]);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      {allPosts && (
        <div className="d-flex flex-row flex-wrap justify-content-between">
          {allPosts.map((post) => (
            <div
              className="card"
              style={{ width: '18rem', marginBottom: '2rem' }}
              key={post.id}
            >
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <hr />
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PostList;
