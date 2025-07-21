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
export default function EditCards() {
  const [editCard, setEditCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [choosenCards, setChoosenCards] = useState("");
  const [cardsData, setCardsData] = useState([]);
  useEffect(() => {
    const fetchEditCards = () => {
      axios
        .get("http://localhost:3131/api/contentdata/cards")
        .then((response) => {
          setCardsData(response.data.contentData.cards);
        })
        .catch((error) => {
          console.log(error, "Error fetching Cards data");
        });
    };
    fetchEditCards();
    console.log(cardsData);
  }, []);

  useEffect(() => {
    if (!choosenCards || cardsData.length === 0)  return; 
      const selected = cardsData.find(
        (card) => card.id === parseInt(choosenCards)
      )
      if (selected) {
        setEditCard(selected);
        setIsVisible(true);
      } else {
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
      .post("http://localhost:3131/api/contentEdit/cards", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (response) {
        console.log(response);
        alert("Data edited")
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div style={{ position: "relative", top: "2rem" }}>
      <div>
        <h3 style={{ textAlign: "center", paddingTop: "1rem" }}>
          Edit Content Cards
        </h3>
        <form
          onSubmit={formSubmit}
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
          {isVisible && <CardItem editCard={editCard} />}
          <TextField
            id="outlined-basic"
            label="Name"
            value={editCard?.name || ""}
            onChange={(e) => handleInputChange("name", e.target.value)}
            variant="outlined"
            style={{ width: "80%" }}
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Text"
            multiline
            style={{ width: "80%" }}
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
          <Button type="submit" variant="outlined" value="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
