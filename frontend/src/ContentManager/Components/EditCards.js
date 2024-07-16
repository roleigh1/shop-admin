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
import axios from "axios";
import { POST_CONTENT } from "../../config/apiPaths";

const api_Host = process.env.REACT_APP_API_HOST;

export default function EditCards() {
  const { fetchEditCards, cardsData, choosenCards, setChoosenCards } =
    useMyContext(MyProvider);
  const [editCard, setEditCard] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchEditCards();
  }, []);

  useEffect(() => {
    switch (choosenCards) {
      case "1":
        setEditCard(cardsData[0]);
        setIsVisible(true);
        break;
      case "2":
        setEditCard(cardsData[1]);
        setIsVisible(true);
        break;
      case "3":
        setEditCard(cardsData[2]);
        setIsVisible(true);
        break;
      default:
        console.log("Error setting data in the inputs");
    }
  }, [choosenCards, cardsData]);

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
    const imageUrl = URL.createObjectURL(file);
    setEditCard((prevData) => ({
      ...prevData,
      image: imageUrl,
      imageUpload: file,
    }));
    console.log({ ...editCard, image: imageUrl, imageUpload: file });
  };
  const handleInputChange = (property, value) => {
    setEditCard((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };
  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", editCard.id);
    formData.append("name", editCard.name);
    formData.append("cardText", editCard.text);
    formData.append("picture", editCard.imageUpload);
    axios
      .post(`${api_Host}${POST_CONTENT}cards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="relative top-8">
      <div>
        <h3 className="text-center pb-4">Edit Content Cards</h3>
        <form
          onSubmit={formSubmit}
          className="flex justify-center items-center gap-4"
        >
          <FormControl>
            <InputLabel htmlFor="demo-simple-select-label">Cards</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="cards"
              value={choosenCards}
              className="w-32 h-12"
              onChange={handleChange}
              required
            >
              <MenuItem value={"1"}>Card 1</MenuItem>
              <MenuItem value={"2"}>Card 2</MenuItem>
              <MenuItem value={"3"}>Card 3</MenuItem>
            </Select>
          </FormControl>
          {isVisible && <CardItem editCard={editCard} />}
          <TextField
            id="outlined-basic"
            label="Name"
            value={editCard?.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            variant="outlined"
            className="w-4/5"
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Text"
            multiline
            className="w-4/5"
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
              className="hidden"
              name="image"
              onChange={handleFileChange}
            />
          </Button>
          <Button type="submit" variant="outlined" value="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
