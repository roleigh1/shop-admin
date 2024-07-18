import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style.css";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { MyProvider, useMyContext } from "../../ContextApi";
import { POST_INSERT } from "../../config/apiPaths";

const api_Host = process.env.REACT_APP_API_HOST;

export default function InsertData() {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [where, setWhere] = useState("");
  const [price, setPrice] = useState("");
  const [pictureInsert, setPictureInsert] = useState(null);
  const [imgName, setImgName] = useState("");

  const { setFlagInsertItem } = useMyContext(MyProvider);
  const handleUpload = async (e) => {
    const formData = new FormData();

    e.preventDefault();
    formData.append("type", type);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("where", where);
    formData.append("image", pictureInsert);
    fetch(`${api_Host}${POST_INSERT}`, {
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
        setFlagInsertItem(true);
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
    <div className="flex justify-center flex-col items-center gap-4">
      <h4 className="mt-5 ">Add a Product to the store</h4>

      <form
        method="POST"
        action={"/profile-upload-single"}
        encType="multipart/form-data"
        className="flex flex-col items-center gap-5"
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
