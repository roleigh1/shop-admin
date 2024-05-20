import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MyProvider, useMyContext } from "../../ContextApi";
import CardItem from "./Cards";
export default function EditCards() {
  const { fetchEditCards, cardsData, choosenCards, setChoosenCards } =
    useMyContext(MyProvider);
  useEffect(() => {
    fetchEditCards();
  }, []);

  const handleChange = (event) => {
    const selection = event.target.value;
    setChoosenCards(selection);
    console.log(cardsData);
  };
  useEffect(() => {});
  return (
    <div>
      <h3 style={{ textAlign: "center", paddingTop: "1rem" }}>
        Edit Content Cards
      </h3>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Cards</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="cards"
            value={choosenCards}
            style={{ width: "8rem", height: "3rem" }}
            onChange={handleChange}
            required
          >
            <MenuItem value={"1"}>Card 1</MenuItem>
            <MenuItem value={"2"}>Card 2</MenuItem>
            <MenuItem value={"3"}>Card 3</MenuItem>
          </Select>
        </FormControl>
        <CardItem/>
      </form>

    </div>
  );
}
