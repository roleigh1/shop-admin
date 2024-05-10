import React, { useContext, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MyProvider, useMyContext } from "../../ContextApi";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
export default function Editbanner() {
  const { bannerData, setBannerData } = useMyContext(MyProvider);
  const [which, setWhich] = useState();
  const [header, setHeader] = useState();
  const [text, setText] = useState();
  const handleInputChange = (property, value) => {
    setBannerData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };
  console.log("test"); 
  const handleChange = (event) => {
    const newTable = event.target.value;
    setWhich(newTable);
  };
  const handleFileChange = (event) => {
    let file = event.target.files[0];
  };
  return (
    <div>
      <h3 style={{ textAlign: "center", paddingTop: "1rem" }}>
        Edit Image Banners
      </h3>
      <div>
        <form
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
              <MenuItem value={"home"}>Home</MenuItem>
              <MenuItem value={"products"}>Products</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            variant="outlined"
            style={{}}
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Text"
            multiline
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          <Button type="submit" variant="outlined" value="submit">
            Submit
          </Button>
          <svg
            className="watch"
            xmlns="http://www.w3.org/2000/svg"
            style={{}}
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
          </svg>
        </form>
      </div>
    </div>
  );
}
