import React, { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MyProvider, useMyContext } from "../../ContextApi";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import DialogTitle from "@mui/material/DialogTitle";
import { POST_CONTENT } from "../../config/apiPaths";

const api_Host = process.env.REACT_APP_API_HOST;
export default function Editbanner() {
  const { fetchEditBanners, which, setWhich, bannerData } =
    useMyContext(MyProvider);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    headline: "",
    text: "",
    img: "",
    imageUpload: null,
  });

  useEffect(() => {
    fetchEditBanners();
  }, []);

  useEffect(() => {
    if (which) {
      if (which === "Products") {
        setEditData(bannerData[0]);
      } else {
        setEditData(bannerData[1]);
      }
    }
    console.log(which);
  }, [which, bannerData]);
  const handleChange = (event) => {
    const newTable = event.target.value;
    setWhich(newTable);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (property, value) => {
    setEditData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!supportedImageTypes.includes(file.type)) {
      alert("Please enter a valid image");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setEditData((prevData) => ({
      ...prevData,
      img: imageUrl,
      imageUpload: file,
    }));
    console.log({ ...editData, img: imageUrl, imageUpload: file });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("headline", editData.headline);
    formData.append("text", editData.text);
    formData.append("location", which);
    formData.append("picture", editData.imageUpload);
    formData.append("bottom", editData.bottom);

    console.log(editData);
    postContentEdit(formData);
  };

  const postContentEdit = (formData) => {
    axios
      .post(`${api_Host}${POST_CONTENT}banner`, formData, {
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
    <div>
    <h3 className="text-center pb-4 pt-8">Edit Image Banners</h3>
    <div>
      <form onSubmit={formSubmit} className="flex justify-center items-center gap-4">
        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Which</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            label="Which"
            value={which}
            className="w-32 h-12"
            onChange={handleChange}
            required
          >
            <MenuItem value={"Home"}>Home</MenuItem>
            <MenuItem value={"Products"}>Products</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Header"
          value={editData?.headline || ""}
          onChange={(e) => handleInputChange("headline", e.target.value)}
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
            className="hidden"
            name="image"
            onChange={handleFileChange}
          />
        </Button>
        <div className="flex flex-col items-center">
         
          <svg
            className="relative bottom-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={handleClickOpen}
          >
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
          </svg>
          <Button type="submit" variant="outlined" value="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
    <div>
      <Dialog open={open}   onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Banner"}</DialogTitle>
        <DialogContent style={{height:"100%"}}>
        <div className="container my-5 relative max-w-xl mx-auto mt-20">
    <div className="relative">
      <img
        className="h-60 w-[30rem] object-cover rounded-md"
        src={editData?.img}
        alt="Banner"
      />
      <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md"></div>
      <div className="absolute inset-0 text-center flex items-center justify-center flex-col">
        <h2 className="text-white text-1xl mt-5">{editData?.headline}</h2>
        <p className="text-white text-xl mb-10">{editData?.text}</p>
      </div>
    </div>
  </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>
  );
}
