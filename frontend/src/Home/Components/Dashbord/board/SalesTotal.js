import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PointOfSaleTwoToneIcon from "@mui/icons-material/PointOfSaleTwoTone";
import { MyContext, useMyContext } from "../../../../ContextApi";

import "../../../home.css";
import { styled } from "@mui/material";
export default function SalesTotal() {
  const { sales } = useMyContext(MyContext);
  const sumAllSales = Object.values(sales)
    .reduce((total, monthData) => total + monthData, 0)
    .toFixed(2);
  console.log(sumAllSales);

  return (

    <div
      className="bg-white w-[8rem] h-[8rem]  flex flex-col justify-center items-center"
    >
        <PointOfSaleTwoToneIcon />
        <h6>Total </h6>
        <span >
          €{sumAllSales}
        </span>

    </div>
  );
}
