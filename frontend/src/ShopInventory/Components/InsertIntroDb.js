import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style.css";
import Button from "@mui/material/Button";
import { MyProvider, useMyContext } from "../../ContextApi";
import { POST_INSERT } from "../../config/apiPaths";

const api_Host = process.env.REACT_APP_API_HOST;

export default function InsertData() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [where, setWhere] = useState("");
  const [price, setPrice] = useState("");
  const [pictures, setPictures] = useState([]);
  const { setFlagInsertItem } = useMyContext(MyProvider);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("type", type);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("where", where);

    // Append each image to the "images" key
    pictures.forEach((picture) => {
      formData.append("images", picture); // Use "images" as the key
    });

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    fetch(`${api_Host}${POST_INSERT}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload successful:", data);
        setType("");
        setName("");
        setWhere("");
        setPrice("");
        setPictures([]);

        setFlagInsertItem(true);
      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];

    // Filter out unsupported file types and update the state
    const validFiles = files.filter((file) =>
      supportedImageTypes.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      alert("Some files are not valid images and were not included.");
    }

    setPictures(validFiles); // Set only valid files

  };

  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <h4 className="mt-5 ">Add a Product to the store</h4>

      <form
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col items-center gap-5"
        onSubmit={handleUpload}
      >
        <TextField
          id="outlined-basic"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          className=" w-[14rem] h-12"
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
            required
            className=" w-[6rem] h-12"
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
            className=" w-[6rem] h-12"
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
          className=" w-[6rem] h-12"
          type="number"
          required
        />

        <input
          type="file"
          className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          multiple
          onChange={handleFileChange}
          accept="image/jpeg, image/jpg, image/png"
        />

        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
}
