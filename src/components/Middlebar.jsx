import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  height: 80px;
  margin: 5px;
  margin-top: 20px;
  ${mobile({ flexDirection: "column", height: "245px", width: "370px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 5px 10px;
  border-radius: 1rem;
  box-shadow: 0px 0px 15px 3px #61616183;
  ${mobile({
    width: "370px",
    margin: "5px 2px",
    flexDirection: "column",
    alignItem: "center",
    justifyContent: "center",
  })}
`;
const Head = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
  ${mobile({ fontSize: "15px" })}
`;
const Number = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #858585;
  ${mobile({ fontSize: "15px" })}
`;
const Middlebar = ({ data }) => {
  return (
    <Container>
      <Left>
        <Head>Total active cases</Head>
        <Number>{data[0]}</Number>
      </Left>
      <Left>
        <Head>Total recovered cases</Head>
        <Number>{data[1]}</Number>
      </Left>
      <Left>
        <Head>Total Deaths</Head>
        <Number>{data[2]}</Number>
      </Left>
    </Container>
  );
};

export default Middlebar;
