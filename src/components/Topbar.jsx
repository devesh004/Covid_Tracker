import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  height: 60px;
  background-color: white;
  color: #555;
  font-size: 16px;
  box-shadow: 0px 0px 15px 3px #61616183;
  ${mobile({
    width: "375px",
    flexDirection: "column",
    marginBottom: "15px",
    height: "130px",
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Filter = styled.span`
  font-size: large;
  font-weight: 600;
`;
const Select = styled.select`
  padding: 0.7rem;
  border-radius: 1rem;
  background-color: #d1d1d190;
  font-size: 0.9rem;
  ${mobile({ width: "80%" })}
`;
const Option = styled.option`
  ${mobile({ height: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${mobile({ margin: "5px 5px" })}
`;
const Date = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const From = styled.span``;
const SelectedDate = styled.span``;

const Topbar = ({ chngHandler, from, changeDataLimit }) => {
  const [countries, setCountries] = useState([]);

  useEffect(async () => {
    fetch("https://api.covid19api.com/countries")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data.map((el) => el.Country));
      });
  }, []);

  return (
    <Container>
      <Left>
        <Filter>Country</Filter>
        <Select
          // defaultValue="India"
          onChange={(e) => {
            chngHandler(e.target.value);
          }}
        >
          {countries.map((el) => {
            if (el === "India")
              return (
                <Option key={el} selected value={el}>
                  India
                </Option>
              );
            else
              return (
                <Option key={el} value={el}>
                  {el}
                </Option>
              );
          })}
        </Select>
        {/* <Select>
          <Option>Select Gender</Option>
          <Option value={Male}>Male</Option>
          <Option>Female</Option>
        </Select>
        <Select>
          <Option>Select Age</Option>
          <Option></Option>
        </Select> */}
      </Left>
      <Right>
        <Date>
          <From>From</From>
          <SelectedDate>{from}</SelectedDate>
        </Date>
        <Select
          onChange={(e) => {
            changeDataLimit(e.target.value);
          }}
        >
          <Option value={15}>Last 10 days</Option>
          <Option value={35}>Last 30 days</Option>
          <Option value={185}>Last 6 months</Option>
          <Option value={370}>Last 1 year</Option>
        </Select>
      </Right>
    </Container>
  );
};

export default Topbar;
