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
import { Card, Container } from "react-bootstrap";

const Bottom = ({ stats }) => {
  return (
    // <Container>
    <Card className="shadow-lg">
      <Card.Body style={{ height: "450px" }}>
        <ResponsiveContainer width="95%" height="95%">
          <BarChart data={stats}>
            <CartesianGrid />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="NewCases" stackId="a" fill="#3498DB" />
            <Bar dataKey="NewRecovered" stackId="a" fill="#18BC9C" />
            <Bar dataKey="NewDeaths" stackId="a" fill="#E74C3C" />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
    // </Container>
  );
};

export default Bottom;
