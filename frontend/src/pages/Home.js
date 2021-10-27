import React from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

const Home = () => {
  return (
    <main>
      <h4>ConnectMe</h4>
      <PostForm />
      {/* retrieve recent posts, and display them */}
      <PostList />
    </main>
  );
};

export default Home;
