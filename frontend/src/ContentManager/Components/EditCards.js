import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
export default function EditCards() {
  const [chooseCards, setChooseCards] = useState("");
  const handleChange = () => {};

  return (
    <React.Fragment>
      <h3 style={{ textAlign: "center", paddingTop: "1rem" }}>
        Edit Content Cards
      </h3>
      <React.Fragment
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Cards</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Which"
            value={chooseCards}
            style={{ width: "8rem", height: "3rem" }}
            onChange={handleChange}
            required
          >
            <MenuItem value={"1"}>Card 1</MenuItem>
            <MenuItem value={"2"}>Card 2</MenuItem>
            <MenuItem value={"3"}>Card 3</MenuItem>
            <MenuItem value={"4"}>Card 4</MenuItem>
          </Select>
        </FormControl>
      </React.Fragment>
    </React.Fragment>
  );
}
