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
        <Card.Text>
          description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Cupiditate libero laudantium pariatur distinctio, quia, aliquid
          mollitia corrupti, perferendis optio reprehenderit qui sunt natus
          explicabo iste fugiat sed provident aperiam! Natus.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SmallPost;
