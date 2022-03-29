import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { publicRequest } from "../requestMethod";

const Topbar = ({ chngHandler, from, changeDataLimit, logout }) => {
  const [countries, setCountries] = useState([]);

  useEffect(async () => {
    fetch("https://api.covid19api.com/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.map((el) => el.Country));
      });
  }, []);

  return (
    <>
      <Navbar className="shadow" bg="light" expand="lg">
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Form.Group className="d-flex">
                <Form.Label htmlFor="con h5">Select country</Form.Label>
                <Form.Select
                  id="con"
                  style={{ backgroundColor: "rgb(156, 156, 156,0.2)" }}
                  onChange={(e) => {
                    chngHandler(e.target.value);
                  }}
                >
                  {countries.map((el) => {
                    if (el === "India")
                      return (
                        <option key={el} selected value={el}>
                          India
                        </option>
                      );
                    else
                      return (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      );
                  })}
                </Form.Select>
              </Form.Group>
            </Nav>
            <Nav>
              <strong className="me-5">
                <span className="mx-2">From</span>
                {from}
              </strong>
            </Nav>
            <Nav className="d-flex">
              <Form.Group className="d-flex ms-auto">
                <Form.Select
                  id="range"
                  onChange={(e) => {
                    changeDataLimit(e.target.value);
                  }}
                  style={{ backgroundColor: "rgb(156, 156, 156,0.2)" }}
                >
                  <option value={15}>Last 10 days</option>
                  <option value={35}>Last 30 days</option>
                  <option value={185}>Last 6 months</option>
                  <option value={370}>Last 1 year</option>
                </Form.Select>
              </Form.Group>
            </Nav>
            <Nav>
              <Button
                onClick={() => {
                  logout();
                }}
                variant="danger"
                className="mx-1"
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Topbar;
