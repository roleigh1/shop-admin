import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MyProvider, useMyContext } from "../../ContextApi";
import CardItem from "./Cards";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
export default function EditCards() {
  const {
    fetchEditCards,
    cardsData,
    setCardsData,
    choosenCards,
    setChoosenCards,
  } = useMyContext(MyProvider);
  const [editCard, setEditCard] = useState("");
  
  useEffect(() => {
    fetchEditCards();
  }, []);
  useEffect(() => {
    switch (choosenCards) {
      case "1":
        setEditCard(cardsData[0]);
        break;
      case "2":
        setEditCard(cardsData[1]);
        break;
      case "3":
        setEditCard(cardsData[2]);
        break;
      default:
        console.log("Error setting data in the inputs");
    }
  },[choosenCards,cardsData]);

  const handleChange = (event) => {
    const selection = event.target.value;
    setChoosenCards(selection);
  };
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!supportedImageTypes.includes(file.type)) {
      alert("Please enter a valid image");
      return;
    }
    setCardsData((prevData) => ({
      ...prevData,
      image: file,
    }));
    console.log({ ...cardsData, image: file });
  };
  const handleInputChange = (property, value) => {
    setEditCard((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  
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
        <CardItem  editCard={editCard}/>
        <TextField
          id="outlined-basic"
          label="Name"
          value={editCard?.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-multiline-static"
          label="Text"
          multiline
          style={{ width: "20rem" }}
          rows={4}
          value={editCard?.text || ""}
          onChange={(e) => handleInputChange("text", e.target.value)}
        />
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <input
            type="file"
            style={{ display: "none" }}
            name="image"
            onChange={handleFileChange}
          />
        </Button>
      </form>
    </div>
  );
}
