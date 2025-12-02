import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { MyProvider, useMyContext } from "../../ContextApi";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../style.css";
import Button from "@mui/material/Button";
import { apiConfig } from "../../config/apiConfig";


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
  const [submitToggle, setSubmitToggle] = useState(true);
  const { apiReq, fetchInventory
  } = useMyContext(MyProvider);

  const [imgName, setImgName] = useState("");
  const fileInputRef = useRef(null);
  const handleChange = (key, value) => {
    setFormdata((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleUpload = async (e) => {
    try {
      setSubmitToggle(prev => !prev);
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
      const response = await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.intventoryEdit}`, false, {
        method: "POST",
        body: data
      })
      if (response) {

        setSubmitToggle(true)
        setFormdata({
          type: "",
          name: "",
          description: "",
          where: "",
          price: "",
          file: "",
          unity: "",
          files: ""
        })
        fetchInventory()
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error inserting product", error);
      setSubmitToggle(false)
      alert("Failed inserting a product")
      setFormdata({
        type: "",
        name: "",
        description: "",
        where: "",
        price: "",
        file: "",
        unity: "",
        files: ""
      })
      setImgName("");
    }
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
    handleChange("files", sortedSelectedFiles);


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
      className="flex justify-center flex-col items-center g-4 "

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
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="block text-center  w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
          <Button type="submit" variant="outlined" className="flex flex-row">
            {submitToggle ? "submit" : <svg className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>}



          </Button>
        </div>
      </form>
    </div>
  );
}
