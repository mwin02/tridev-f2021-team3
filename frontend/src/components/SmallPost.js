import React from "react";
import Card from "react-bootstrap/Card";

const SmallPost = ({ id, username, type, category }) => {
  console.log("id: " + id);
  console.log("username: " + username);
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>{category}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {type == "lfg" ? "Looking For Group" : "Looking For Members"}
        </Card.Subtitle>
        <Card.Text>description: adsfadsjfadslkfjasdlfjasl;kdjfa</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SmallPost;
