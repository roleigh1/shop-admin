import React, { useContext, useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MyProvider, useMyContext } from "../../ContextApi";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import axios from "axios";

export default function Editbanner() {
  const { fetchEditBanners, which, setWhich, bannerData, setBannerData, editData, setEditData } = useMyContext(MyProvider);

  useEffect(() => {
    fetchEditBanners();
    console.log(editData);
  }, [which]);

  const handleChange = (event) => {
    const newTable = event.target.value;
    setWhich(newTable);
    if (newTable === "Home") {
      setEditData(bannerData[0]);
    } else {
      setEditData(bannerData[1]);
    }
  };

  const handleInputChange = (property, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    console.log(file);
    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!supportedImageTypes.includes(file.type)) {
      alert("Please enter a valid Image");
    } else {
      setEditData((prevData) => ({
        ...prevData,
        picture: file,
      }));
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('headline', editData.headline);
    formData.append('text', editData.text);
    formData.append('location', which);
    if (editData.picture) {
      formData.append('picture', editData.picture);
    }
    postContentEdit(formData);
  };

  const postContentEdit = (formData) => {
    axios
      .post("http://localhost:3131/api/contentEdit", formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center", paddingTop: "1rem" }}>Edit Image Banners</h3>
      <div>
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
            <InputLabel htmlFor="demo-simple-select-label">Which</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Which"
              value={which}
              style={{ width: "8rem", height: "3rem" }}
              onChange={handleChange}
              required
            >
              <MenuItem value={"Home"}>Home</MenuItem>
              <MenuItem value={"Products"}>Products</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="header"
            value={editData?.headline || ""}
            onChange={(e) => handleInputChange("headline", e.target.value)}
            variant="outlined"
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Text"
            multiline
            style={{ width: "20rem" }}
            rows={4}
            value={editData?.text || ""}
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
          <div style={{ display: "flex", flexDirection: "row", marginLeft: "2rem" }}>
            <Button type="submit" variant="outlined" value="submit">
              Submit
            </Button>
            <svg
              className="watch"
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: "relative", left: "2rem", top: "5px" }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
            </svg>
          </div>
        </form>
      </div>
    </div>
  );
}
