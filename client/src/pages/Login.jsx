import axios from "axios";
import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "../Loader";
import { publicRequest } from "../requestMethod";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: #e3f1f5;
`;

const Wrapper = styled.div`
  width: 40%;
  height: 60%;
  ${mobile({ width: "80%" })}
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", margin: "5px" })}
`;

const Login = ({ changeUser }) => {
  const [username, setUsername] = useState("");
  const [userPass, setUserPass] = useState("");
  const [validated, setValidated] = useState(false);

  const onClickHandler = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const res = await publicRequest.post("/auth/login", {
      username,
      password: userPass,
    });
    const { accessToken, _doc } = res.data;
    const newObj = { accessToken, ..._doc };
    localStorage.setItem("currentUser", JSON.stringify(newObj));
    changeUser(newObj);
  };

  const loginAsGuest = async () => {
    const res = await publicRequest.post("/auth/login", {
      username: "guest",
      password: "12345",
    });
    localStorage.setItem("currentUser", JSON.stringify(res.data));
    changeUser(res.data);
  };

  return (
    <Container>
      <Wrapper>
        <Form noValidate validated={validated} onSubmit={onClickHandler}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              name="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            style={{ fontFamily: "Verdana" }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="userPass"
              onChange={(e) => setUserPass(e.target.value)}
            />
          </Form.Group>
          <Buttons>
            <Button
              style={{ fontFamily: "Verdana", marginBottom: "10px" }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
            <Link to="/">
              <Button
                style={{
                  fontFamily: "Verdana",
                  width: "100%",
                  marginBottom: "5px",
                }}
                variant="info"
                onClick={loginAsGuest}
              >
                Login as guest
              </Button>
            </Link>
            <Link to="/register">
              <Button
                style={{ fontFamily: "Verdana", width: "100%" }}
                variant="success"
              >
                Don't have account
              </Button>
            </Link>
          </Buttons>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
