import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const insertURL = process.env.REACT_APP_API_POSTINSERT;

export default function InsertData() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [where, setWhere] = useState("");
  const [price, setPrice] = useState("");
  const [pictureInsert, setPictureInsert] = useState(null);
  const [imgName, setImgName] = useState("");

  const handleUpload = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append("type", type);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("where", where);
    formData.append("image", pictureInsert);
    fetch(insertURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload succsessful:", data);
        setType("");
        setName("");
        setWhere("");
        setPrice("");
        setPictureInsert("");
        setImgName("");
      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  };
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    setPictureInsert(file);
    setImgName(file.name);
    console.log(file);
    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

    if (!supportedImageTypes.includes(file.type)) {
      alert("Please enter a valid Image");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <h4 style={{ marginTop: "2.5rem", marginBottom: "0.1rem" }}>
        Add a Product to the store
      </h4>

      <form
        method="POST"
        action={"/profile-upload-single"}
        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
        onSubmit={(e) =>
          handleUpload(e, name, type, where, price, pictureInsert)
        }
      >
        <TextField
          id="outlined-basic"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          style={{}}
          required
        />
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Where</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Where"
            onChange={(e) => setWhere(e.target.value)}
            value={where}
            style={{ width: "8rem", height: "3rem" }}
            required
          >
            <MenuItem value={"products"}>Products</MenuItem>
            <MenuItem value={"bestseller"}>Bestseller</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
            style={{ width: "6rem", height: "3rem" }}
            required
          >
            <MenuItem value={"Fruits"}>Fruits</MenuItem>
            <MenuItem value={"Mushrooms"}>Mushrooms</MenuItem>
            <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
            <MenuItem value={"Herbs"}>Herbs</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          style={{ width: "4rem" }}
          required
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
            required
            onChange={handleFileChange}
          />
        </Button>

        <span style={{ color: "black", position: "relative" }}>{imgName}</span>

        <Button type="submit" variant="outlined" value="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
