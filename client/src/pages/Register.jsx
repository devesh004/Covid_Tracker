import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { publicRequest } from "../requestMethod";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  background-color: #e3f1f5;
  ${mobile({ height: "auto !important", minHeight: "100%" })}
`;

const Wrapper = styled.div`
  width: 70%;
  margin: 5px;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  ${mobile({ flexDirection: "column", marginTop: "10px", width: "85%" })}
`;

const Div1 = styled.div`
  flex: 1;
  margin: 10px;
`;
const Div2 = styled.div`
  flex: 1;
  margin: 10px;
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Register = ({ changeUser }) => {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (
      form.checkValidity() === false ||
      inputs.password !== inputs.conPassword
    ) {
      event.stopPropagation();
    }

    const { conPassword, ...others } = inputs;
    console.log("DWE", others);
    const res = await publicRequest.post("/auth/register", others);
    const { accessToken, _doc } = res.data;
    const newObj = { accessToken, ..._doc };
    localStorage.setItem("currentUser", JSON.stringify(newObj));
    changeUser(newObj);
    navigate("/");
  };

  return (
    <Container>
      <Form
        noValidate
        validated={validated}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
        onSubmit={submitHandler}
      >
        <Wrapper>
          <Div1>
            <Form.Group
              className="mb-3"
              controlId="formBasicName"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                name="name"
                onChange={handleChanges}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicName"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChanges}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChanges}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Div1>
          <Div2>
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
                name="password"
                onChange={handleChanges}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBsicPassword"
              style={{ fontFamily: "Verdana" }}
            >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="conPassword"
                onChange={handleChanges}
              />
            </Form.Group>
            <Buttons>
              <Button
                variant="success"
                type="submit"
                style={{ fontFamily: "Verdana", width: "100%" }}
              >
                Register
              </Button>
            </Buttons>
          </Div2>
        </Wrapper>
      </Form>
    </Container>
  );
};

export default Register;
