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
  const [files,setFiles] = useState([]);
  const [unity, setUnity] = useState(""); 
  const [imgName, setImgName] = useState("");

  const handleUpload = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    formData.append("type", type);
    formData.append("price", price);
    formData.append("name", name);
    formData.append("where", where);
    formData.append("unity",unity) 
    files.forEach((file) => {
      formData.append("gallery",file); 
    })
    console.log(insertURL)
    fetch(insertURL , {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload succsessful:", data);
   
      })
      .catch((error) => {
        console.error("Upload error", error);
      });
  };
  const handleFileChange = (e) => {
      const selectedFiles = [...e.target.files]; 
      const sortedSelectedFiles = selectedFiles.sort((a,b) => {
        const getNumber = (filename) => {
          const match = filename.match(/\d+/); 
          return match ? parseInt(match[0],10) : 0; 
        }; 
        return getNumber(a.name) - getNumber(b.name); 
      }); 
      setFiles(selectedFiles); 
    
      
      const supportedImageTypes = ["image/jpeg", "image/jpg", "image/png"]; 
      for(const file of selectedFiles){
        if(!supportedImageTypes.includes(file.type) ) {
          alert("Pleas select valid image files (jpg,jpeg,png"); 
          break; 
        
        } 
      }
      if(selectedFiles.length > 4){
        alert("To many Images selected please chose 4 Images"); 
       return; 
      }
      if(selectedFiles.length > 0) {
        setImgName(selectedFiles.map(file => file.name).join(","))
      }
        console.log(selectedFiles);
  }


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

        encType="multipart/form-data"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
        onSubmit={(e) => handleUpload(e)}
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
         <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={unity}
            label="Type"
            onChange={(e) => setUnity(e.target.value)}
            style={{ width: "6rem", height: "3rem" }}
            required
          >
            <MenuItem value={"1kg"}>1 kg</MenuItem>
            <MenuItem value={"500g"}>500g</MenuItem>
            <MenuItem value={"100g"}>100g</MenuItem>
            <MenuItem value={"piece"}>piece</MenuItem>
          </Select>
        </FormControl>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <input
            type="file"
            style={{ display: "none" }}
            name="gallery"
            required
            multiple
            onChange={handleFileChange}
          />
        </Button>
        {
          files.length > 0 && (
            <ul> 
              {files.map((file,index) => {
                <li key={index}>{file.name}</li>
              })}
            </ul>
           
          )}
        <span style={{ color: "black", position: "relative" }}>{imgName}</span>

        <Button type="submit" variant="outlined" value="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
