import React, { useState } from "react";
import GroupFields from "./GroupFields";
import MemberFields from "./MemberField";
import { Card, Container, Button } from "react-bootstrap";

const options = ["Looking for Group", "Looking for Members"];

const PostForm = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("lfg");
  const [groupFields, setGroupFields] = useState({});
  const [memberFields, setMemberFields] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const postInfo = { category, type, ...groupFields, ...memberFields };
    console.log(postInfo);
  };

  return (
    <Container>
      <Card>
        <Card.Header>Create Post</Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
            <label htmlFor="region" className="label">
              Goal:
            </label>
            <select
              className="input-select"
              id="region"
              required
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option key={"lfg"} value={"lfg"}>
                {options[0]}
              </option>
              ;
              <option key={"lfm"} value={"lfm"}>
                {options[1]}
              </option>
              ;
            </select>
            {type === "lfg" && (
              <GroupFields groupFields setGroupFields={setGroupFields} />
            )}
            {type === "lfm" && (
              <MemberFields memberFields setMemberFields={setMemberFields} />
            )}
            <Button type="submit">Submit</Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostForm;
