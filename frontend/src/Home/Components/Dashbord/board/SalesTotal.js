import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PointOfSaleTwoToneIcon from "@mui/icons-material/PointOfSaleTwoTone";
import { MyContext, useMyContext } from "../../../../ContextApi";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";

import "../../../home.css";
export default function SalesTotal() {
  const { sales, visitors } = useMyContext(MyContext);
  const sumAllSales = Object.values(sales)
    .reduce((total, monthData) => total + monthData, 0)
    .toFixed(2);
  console.log(sumAllSales);

  return (
    <Box
      sx={{
        display: "flex",

        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
      className="box"
    >
      <Paper
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PointOfSaleTwoToneIcon style={{ marginBottom: "-1.5rem" }} />
        <h6>Total </h6>
        <span style={{ marginTop: "-1.8rem", textDecoration: "underline" }}>
          €{sumAllSales}
        </span>
      </Paper>
      <Paper
        elevation={3}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VisibilityTwoToneIcon style={{ marginBottom: "-1.5rem" }} />
        <h6>Visitors </h6>

        <span style={{ marginTop: "-1.8rem", textDecoration: "underline" }}>
          {visitors && visitors.counter}
        </span>
      </Paper>
    </Box>
  );
}
