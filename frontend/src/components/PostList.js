import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SmallPost from "./SmallPost";

const samplePost = {
  id: 123123124124,
  username: "Rediablack",
  type: "lfg",
  category: "Leauge of Legend",
};

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // setPosts(["Post 1", "Post 2", "Post 3"]);
  const fetchPosts = useCallback(async (numPosts) => {
    setLoading(true);

    setPosts([samplePost, samplePost, samplePost]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <main>
      {posts.map((post, index) => {
        console.log(post);
        return (
          <Link to={`post/${post.id}`}>
            <SmallPost {...post} key={index} />
          </Link>
        );
      })}
    </main>
  );
};

export default PostList;
