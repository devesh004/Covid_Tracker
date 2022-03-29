import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { mobile } from "../responsive";

// const Container = styled.div`
//   display: flex;
//   height: 80px;
//   margin: 5px;
//   margin-top: 20px;
//   ${mobile({ flexDirection: "column", height: "245px", width: "370px" })}
// `;
// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   margin: 5px 10px;
//   border-radius: 1rem;
//   box-shadow: 0px 0px 15px 3px #61616183;
//   ${mobile({
//     width: "370px",
//     margin: "5px 2px",
//     flexDirection: "column",
//     alignItem: "center",
//     justifyContent: "center",
//   })}
// `;
// const Head = styled.span`
//   font-size: 18px;
//   font-weight: 600;
//   color: #000000;
//   ${mobile({ fontSize: "15px" })}
// `;
// const Number = styled.span`
//   font-size: 18px;
//   font-weight: 600;
//   color: #858585;
//   ${mobile({ fontSize: "15px" })}
// `;
const Middlebar = ({ data }) => {
  return (
    <Container className="my-3">
      <Row>
        <Col md={4}>
          <Card className="mb-2 shadow-lg">
            <Card.Body className="d-flex justify-content-between">
              <h5>Total Active cases</h5>
              <em style={{ fontWeight: "600" }} className="text-info">
                {data[0]}
              </em>
            </Card.Body>
          </Card>
        </Col>
        <Col md={5}>
          <Card className="mb-2 shadow-lg">
            <Card.Body className="d-flex justify-content-between">
              <h5>Total Recovered cases</h5>
              <em style={{ fontWeight: "600" }} className="text-success">
                {data[1]}
              </em>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-2 shadow-lg">
            <Card.Body className="d-flex justify-content-between">
              <h5>Total Deaths</h5>
              <em style={{ fontWeight: "600" }} className="text-danger">
                {data[2]}
              </em>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Middlebar;
