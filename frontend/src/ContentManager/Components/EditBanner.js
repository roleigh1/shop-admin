import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MyProvider, useMyContext } from "../../ContextApi";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";

import { apiConfig } from "../../config/apiConfig";

export default function Editbanner() {
  const { which, setWhich,apiReq} = useMyContext(MyProvider);
  const [bannerData, setBannerData] = useState([]);
  const [editData, setEditData] = useState({
    headline: "",
    text: "",
    img: "",
    imageUpload: null,

  });
  useEffect(() => {

    const fetchEditBanners = async () => {
      try{
        const data = await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.banners}`)
        setBannerData(data.contentData.banners)
      } catch(error){
        console.error("error fetching banner data" ,error); 
      }
    }
    fetchEditBanners()
  }, [which]);

  useEffect(() => {
    if (bannerData && bannerData.length > 0 && which) {
      if (which === "Products") {
        setEditData(bannerData[0]);
      } else {
        setEditData(bannerData[1]);
      }
    }

  }, [which, bannerData]);
  const handleChange = (event) => {
    const newTable = event.target.value;
    setWhich(newTable);
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

    const postContentEdit = async (formData) => {
      try{
        const res = await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.editBanner}`, false, {
          method: "POST",
          body:formData
        })
        if(res){
         
          alert("Edit successful")
        }
      }catch(error) {
        console.error("Error at banner edit", error); 
        alert("Edit failed"); 
      }
    };
    

  return (
    <div >
      <h3 className="text-center pt-[1rem] " >
        Edit Image Banners
      </h3>
      <div>
        <form
          onSubmit={formSubmit}
          className="flex justify-center items-center gap-4 flex-col mt-5"

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
            style={{ width: "80%" }}
            required
          />
          <TextField
            id="outlined-multiline-static"
            label="Text"
            multiline
            style={{ width: "80%" }}
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
        
             

            <Button type="submit" variant="outlined" value="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    
    </div>
  );
}
