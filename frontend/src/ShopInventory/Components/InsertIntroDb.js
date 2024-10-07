import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { MyProvider, useMyContext } from "../../ContextApi";
import { POST_INSERT } from "../../config/apiPaths";

const api_Host = process.env.REACT_APP_API_HOST;

export default function InsertData() {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    where: "",
    price: "",
    text: "",
    unit: "",
  });

  const [pictures, setPictures] = useState([]);
  const [errorTextFile, setErrorTextFile] = useState("");
  const { setFlagInsertItem } = useMyContext(MyProvider);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const formDataToSend = new FormData();
  
  
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

  
    pictures.forEach((file) => {
      formDataToSend.append("images", file);
    });
    console.log(formDataToSend); 
console.log(formDataToSend); 
    if (pictures.length === 4) {
      try {
        const response = await fetch(`${api_Host}${POST_INSERT}`, {
          method: "POST",
          body: formDataToSend,
        });

        if (!response.ok) {
          throw new Error("Bad request");
        }

        const data = await response.json();
        console.log("Upload successful:", data);

        // Resetting the form
        setFormData({
          type: "",
          name: "",
          where: "",
          price: "",
          text: "",
          unit: "",
        });
        setPictures([]);
        setErrorTextFile(""); // Reset error message
        setFlagInsertItem(true);
      } catch (error) {
        console.error("Upload error:", error);
      }
    } else {
      setErrorTextFile("Please upload 4 images to insert a product");
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    const validFiles = files.filter((file) => supportedImageTypes.includes(file.type));

    if (validFiles.length !== files.length) {
      alert("Some files are not valid images and were not included.");
    }

    if (validFiles.length > 4) {
      alert("Please select up to 4 images only.");
      return;
    }

    setPictures(validFiles);
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
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="outlined"
          className=" w-[14rem] "
          required
          size="small"
        />

        <TextField
          id="outlined-basic"
          label="Text"
          name="text"
          value={formData.text}
          onChange={handleInputChange}
          variant="outlined"
          className=" w-[15rem] "
          required
          size="small"
          multiline
          rows={5}
        />
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Unit</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="unit"
            value={formData.unit}
            label="Unit"
            onChange={handleInputChange}
            required
            className=" w-[8rem] "
            size="small"
          >
            <MenuItem value={"KG"}>1 KG</MenuItem>
            <MenuItem value={"Bunch"}>Bunch</MenuItem>
            <MenuItem value={"1/2 KG"}>1/2 KG</MenuItem>
            <MenuItem value={"1/4 KG"}>1/4 KG</MenuItem>
            <MenuItem value={"100g"}>100g</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Where</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="where"
            value={formData.where}
            label="Where"
            onChange={handleInputChange}
            required
            className=" w-[8rem] "
            size="small"
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
            name="type"
            value={formData.type}
            label="Type"
            onChange={handleInputChange}
            className=" w-[8rem] "
            required
            size="small"
          >
            <MenuItem value={"Fruits"}>Fruits</MenuItem>
            <MenuItem value={"Mushrooms"}>Mushrooms</MenuItem>
            <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
            <MenuItem value={"Herbs"}>Herbs</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={formData.price}
          name="price"
          onChange={handleInputChange}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          className=" w-[5rem] "
          type="number"
          size="small"
          required
        />

        <input
          type="file"
          className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded"
          multiple
          onChange={handleFileChange}
          accept="image/jpeg, image/jpg, image/png"
        />

        <span className="text-red-500 ">{errorTextFile}</span>

        <Button type="submit" className="" variant="outlined">
          Submit
        </Button>
      </form>
    </div>
  );
}
