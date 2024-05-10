
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MyProvider, useMyContext } from '../../ContextApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../style.css"
export default function ModifyData() {
  const { editAbleData, setEditAbleData, updateData } = useMyContext(MyProvider);

  const handleInputChange = (property, value) => {
    setEditAbleData((prevData) => ({
      ...prevData,
      [property]: value,
    }));
  };
  const handleEditData = () => {
    updateData();
    window.location.reload();
    setEditAbleData("")
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center", alignItems: "center" }}>
      <h5>Modify Data in the store</h5>
      <form className='modify'   onSubmit={handleEditData}
        style={{ display: "inline-flex", gap: "5%", alignItems: "center", marginBottom: "2rem" ,flexDirection:"row" }}>
        <span style={{position:"relative",left:"1rem"}}>ID: {editAbleData?.id || ''} </span>
        <TextField
          style={{ width: "10rem" }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={editAbleData?.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          required
        />
        <TextField
          style={{ width: "20rem" }}
          id="outlined-basic"
          label="Image"
          variant="outlined"
          value={editAbleData?.image || ''}
          onChange={(e) => handleInputChange('image', e.target.value)}
          required
        />
        <TextField
          style={{ width: "6rem" }}
          id="outlined-basic"
          label="Price"
          variant="outlined"
          value={editAbleData?.price || ''}
          onChange={(e) => handleInputChange('price', e.target.value)}
          required
        />

        <FormControl>
          <InputLabel htmlFor="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={editAbleData?.type || ''}
            label="Type"
            onChange={(e) => handleInputChange('type', e.target.value)}
            style={{ width: "6rem" }}
            required
          >
            <MenuItem value={"Fruits"}>Fruits</MenuItem>
            <MenuItem value={"Mushrooms"}>Mushrooms</MenuItem>
            <MenuItem value={"Vegetables"}>Vegetables</MenuItem>
            <MenuItem value={"Herbs"}>Herbs</MenuItem>
          </Select>
        </FormControl>
        <Button  type="submit"variant="outlined" >Confirm</Button>
      </form>
    </div>
  );
}
