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
  const [files, setFiles] = useState([]);
  const [unity, setUnity] = useState("");
  const [imgName, setImgName] = useState("");

  const handleUpload = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append("type", type);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("where", where);
    formData.append("unity", unity)

    files.forEach((file) => {
      formData.append("gallery", file);
    })
    console.log(insertURL)
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
        setFiles([]);
        setUnity("");

      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  };
  const handleFileChange = (e) => {
    const selectedFiles = [...e.target.files];
    const sortedSelectedFiles = selectedFiles.sort((a, b) => {
      const getNumber = (filename) => {
        const match = filename.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
      };
      return getNumber(a.name) - getNumber(b.name);
    });
    setFiles(selectedFiles);


    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    for (const file of selectedFiles) {
      if (!supportedImageTypes.includes(file.type)) {
        alert("Pleas select valid image files (jpg,jpeg,png");
        break;

      }
    }
    if (selectedFiles.length > 4) {
      alert("To many Images selected please chose 4 Images");
      return;
    }
    if (selectedFiles.length > 0) {
      setImgName(selectedFiles.map(file => file.name).join(","))
    }
    console.log(selectedFiles);
  }


  return (
    <div
      className="flex justify-center flex-col items-center g-4"

    >
      <h4 className="mt-10 mb-[1rem]" >
        Add a Product to the store
      </h4>

      <form
        method="POST"

        encType="multipart/form-data"
        className="flex-col flex gap-2 justify-center items-center"

        onSubmit={(e) => handleUpload(e)}
      >
        <TextField
          id="outlined-basic"
          className="w-[14rem]"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
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
            className="w-[8rem] h-[3rem]"
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
            className="w-[6rem] h-[3rem]"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
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

          className="w-[5rem]"
          required
        />
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={unity}
            label="Type"
            onChange={(e) => setUnity(e.target.value)}
            className="w-[6rem] h-[3rem]"
            required
          >
            <MenuItem value={"KG"}>1 kg</MenuItem>
            <MenuItem value={"500g"}>500g</MenuItem>
            <MenuItem value={"100g"}>100g</MenuItem>
            <MenuItem value={"piece"}>piece</MenuItem>
          </Select>
        </FormControl>
<div className="w-full flex flex-col items-center gap-4 mt-5">
  <input
    id="multiple_files"
    type="file"
    multiple
    onChange={handleFileChange}
    className="block text-center  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
  />
  <Button type="submit" variant="outlined">
    Submit
  </Button>
</div>
      </form>
    </div>
  );
}
