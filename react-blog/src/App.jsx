import React, { useState, useMemo } from 'react';
import PostCreate from './PostCreate';
import './App.css';
import PostList from './PostList';

export const PostContext = React.createContext({
  postsChanged: 0,
  updatePosts: () => {},
});

function App() {
  const [postsChanged, updatePosts] = useState(false);
  const value = useMemo(() => ({ postsChanged, updatePosts }), [postsChanged]);
  return (
    <PostContext.Provider value={value}>
      <div className="container">
        <h1>Create Post</h1>
        <PostCreate />
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </PostContext.Provider>
  );
}

export default App;
