import React from "react";
import Card from "react-bootstrap/Card";

const SmallPost = ({ id, username, type, category }) => {
  console.log("id: " + id);
  console.log("username: " + username);
  return (
    <Card>
      {type == "lfg" ? "looking for group" : "looking for members"}, category:{" "}
      {category}, id: {id}, username: {username}
    </Card>
  );
};

export default SmallPost;
