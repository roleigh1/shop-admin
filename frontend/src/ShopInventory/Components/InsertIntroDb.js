import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style.css";
import Button from "@mui/material/Button";


const insertURL = process.env.REACT_APP_API_POSTINSERT;

export default function InsertData() {
  const [formdata, setFormdata] = useState({
    type: "",
    name: "",
    description: "",
    where: "",
    price: "",
    file: "",
    unity: "",
    files: ""
  })
  const [imgName, setImgName] = useState("");

  const handleChange = (key, value) => {
    setFormdata((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("type", formdata.type);
    data.append("price", formdata.price);
    data.append("name", formdata.name);
    data.append("where", formdata.where);
    data.append("unity", formdata.unity);
    data.append("description", formdata.description);

    formdata.files.forEach((file) => {
      data.append("gallery", file);
    });
    fetch(insertURL, {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload succsessful:", data);
        setFormdata({
          type: "",
          name: "",
          description: "",
          where: "",
          price: "",
          unity: "",
          files: [],
        });

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
    handleChange("files", selectedFiles)


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
          value={formdata.name}
          onChange={(e) => handleChange("name", e.target.value)}
          variant="outlined"
          required
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          onChange={(e) => handleChange("description", e.target.value)}
          value={formdata.description}
        />
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Where</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Where"
            onChange={(e) => handleChange("where", e.target.value)}
            value={formdata.where}
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
            value={formdata.type}
            label="Type"
            onChange={(e) => handleChange("type", e.target.value)}
            required
          >
            <MenuItem value={"Fruits"}>Fruits</MenuItem>
            <MenuItem value={"Mushrooms"}>Mushrooms</MenuItem>
            <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
            <MenuItem value={"Herbs"}>Herbs</MenuItem>
          </Select>
        </FormControl>
        <TextField
          value={formdata.price}
          onChange={(e) => handleChange("price", e.target.value)}
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
            value={formdata.unity}
            label="Unity"
            onChange={(e) => handleChange("unity", e.target.value)}
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
