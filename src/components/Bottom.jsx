import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px;
  margin-top: 50px;
  background-color: white;
  height: 420px;
  overflow: hidden;
  width: 210vh;
  box-shadow: 0px 0px 15px 3px #61616183;
  ${mobile({
    height: "300px",
    margin: "2px",
    width: "90vh",
  })}
  ${tablet({ width: "400px", height: "500px" })}
`;

const Bottom = ({ stats }) => {
  return (
    <Container>
      <ResponsiveContainer width="95%" height="95%">
        <BarChart data={stats}>
          <CartesianGrid />
          <XAxis dataKey="Date" />
          <YAxis domain={[0, 5000]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="NewCases" stackId="a" fill="#543bc0" />
          <Bar dataKey="NewRecovered" stackId="a" fill="#4abd4a" />
          <Bar dataKey="NewDeaths" stackId="a" fill="#d14444" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default Bottom;
