import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PointOfSaleTwoToneIcon from "@mui/icons-material/PointOfSaleTwoTone";
import { MyContext, useMyContext } from "../../../../ContextApi";

export default function SalesTotal() {
  const { sales } = useMyContext(MyContext);
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
      className="box flex justify-center items-center"
    >
      <Paper
        elevation={3}
        className="flex flex-col justify-center items-center p-4"
      >
        <PointOfSaleTwoToneIcon className="mb-6" />
        <h6 className="text-lg font-semibold">Total</h6>
        <span className="mt-4 underline">€{sumAllSales}</span>
      </Paper>
    </Box>
  );
}
