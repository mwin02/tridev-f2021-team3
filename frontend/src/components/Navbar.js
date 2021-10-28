import React, { useState } from "react";
import { Container, Navbar, Form, Button, Row, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import logo from "../logo.svg";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [goToSearch, setGoToSearch] = useState(false);
  const handleSearch = () => {
    console.log("search term");
    setGoToSearch(true);
    console.log(searchTerm);
  };

  return (
    <Navbar bg="dark" sticky="top">
      {goToSearch && <Redirect to={`/search/${searchTerm}`} />}
      <Container fluid>
        <Row>
          <Col>
            <Navbar.Brand href="/">
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="ConnectMe App Logo"
              />
            </Navbar.Brand>
          </Col>
          <Col xs="8" xxl="10">
            <Form
              className="d-flex"
              style={{
                marginTop: "5px",
              }}
            >
              <Form.Control
                htmlSize="100"
                type="search"
                placeholder="Search Category"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                className="me-2"
                aria-label="Search"
              />
              <Button
                variant="outline-success"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavBar;
