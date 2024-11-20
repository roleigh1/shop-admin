import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import { MyProvider, useMyContext } from "../../ContextApi";
import { POST_DELETE } from "../../config/apiPaths";
import "./tableStyle.css";

const api_Host = process.env.REACT_APP_API_HOST;
export default function InventoryTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState();
  const [flagDelete, setFlagDelete] = useState(false);

  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const { table, setTable, inventoryTable, fetchInventory, flagInsertItem } =
    useMyContext(MyProvider);

  useEffect(() => {
    fetchInventory();
  }, [table]);
  useEffect(() => {
    if (flagInsertItem || flagDelete) {
      fetchInventory();
      console.log("refresh happend ");
    }
  }, [flagInsertItem, flagDelete]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", type: "number", width: 90 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "description", headerName: "Text", width: 130 },
    { field: "unit", headerName: "unit", width: 130 },
    { field: "firstImage", headerName: "First image", width: 800 },
    { field: "secondImage", headerName: "Secound image", width: 800 },
    { field: "thirdImage", headerName: "Third image", width: 800 },
    { field: "fourthImage", headerName: "Fourth image", width: 800 },
  ];

  const handleChange = (event) => {
    const newTable = event.target.value;
    setTable(newTable);
  };

  const handleRefreshTable = () => {
    setRowSelectionModel([]);
    fetchInventory();
  };
  console.log(inventoryTable)
  const handleDelete = () => {
    if (rowSelectionModel.length === 0) {
      return null;
    } else {
      let idForDelete = rowSelectionModel;
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idForDelete, table }),
      };
      fetch(`${api_Host}${POST_DELETE}inventory`, options)
        .then((res) => res.json())
        .then((data) => {
          console.log("res recived", data);
        })
        .catch((error) => {
          console.error("Error sending req", error);
        });
    }
    setFlagDelete(true);
  };
  const handleWatch = () => {
    if (rowSelectionModel.length < 1) {
      return null;
    }
    setOpenDialog(true);
    const searchedID = rowSelectionModel[0];
    const foundProduct = inventoryTable.find(
      (product) => product.id === searchedID
    );
    setDataDialog(foundProduct);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <div className="h-[500px] w-full flex justify-center flex-col pt-6">
      <div className="flex flex-row  ml-4">
        <FormControl className="m-1 min-w-[120px]  " size="small">
          <InputLabel id="demo-select-small-label">Table</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={table}
            label="table"
            onChange={handleChange}
          >
            <MenuItem value={"Bestseller"}>Bestseller</MenuItem>
            <MenuItem value={"Products"}>Products</MenuItem>
          </Select>
        </FormControl>
        <svg
          className="refresh relative top-3 left-3"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 30 30"
          onClick={handleRefreshTable}
        >
          <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
        </svg>
      </div>

      <DataGrid
        rows={inventoryTable}
        columns={columns}
        pageSize={8}
        checkboxSelection={true}
   
        className="mt-1 "
        onRowSelectionModelChange={setRowSelectionModel}
        rowSelectionModel={rowSelectionModel}
      />
      <div className="flex flex-row justify-end items-center gap-1.5 mr-4 mt-5 ">
        <svg
          className="delete"
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
        <svg
          onClick={handleWatch}
          className="watch mt-[-0.5]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
        </svg>
      </div>

      {openDialog && (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="h-[45rem] "
        >
          <DialogContent>
            <MDBContainer
              fluid
              className="mt-5 text-center  pointer-events-none"
            >
              <MDBRow className="flex justify-center items-center">
                <MDBCol
                  md="12"
                  lg="7"
                  className="flex justify-center items-center"
                >
                  <MDBCard className="h-[23rem] min-w-[10rem] rounded-[10px]">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="w-full"
                    >
                      <MDBCardImage
                        src={dataDialog.image}
                        fluid
                        className="h-[6.5rem] rounded-t-[10px] object-cover w-full"
                      />
                      <a href="#!">
                        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-black bg-opacity-50">
                          <div className="bg-opacity-60"></div>
                        </div>
                      </a>
                    </MDBRipple>
                    <MDBCardBody className="h-[250px] overflow-hidden mt-[-0.5rem] rounded-b-[5px] shadow-xl">
                      <h5 className="mt-2 underline">{dataDialog.name}</h5>
                      <p className=" underline">{dataDialog.type}</p>
                      <div className="flex flex-col">
                        <span>{dataDialog.price}€</span>
                        <input
                          id="inputValue"
                          readOnly
                          value={1}
                          className="w-[2.8rem] text-center relative block mx-auto top-20"
                          type="number"
                        />
                      </div>
                      <Button variant="contained" className="relative top-20">
                        Add to cart
                      </Button>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <DialogActions className="mt-12">
              <Button onClick={handleClose} autoFocus>
                close
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
