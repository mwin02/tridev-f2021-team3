import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SmallPost from "./SmallPost";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

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
    // const data = axios.get();
    setPosts([
      samplePost,
      samplePost,
      samplePost,
      samplePost,
      samplePost,
      samplePost,
      samplePost,
    ]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <h1>Loading</h1>;
  }

  return (
    <Container fluid>
      <h2>Posts</h2>
      {posts.map((post, index) => {
        console.log(post);
        return (
          <Row key={index}>
            <Link
              to={`post/${post.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <SmallPost {...post} />
            </Link>
          </Row>
        );
      })}
    </Container>
  );
};

export default PostList;
