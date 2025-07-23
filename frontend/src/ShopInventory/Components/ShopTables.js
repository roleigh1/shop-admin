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

import "./tableStyle.css";

export default function InventoryTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState();

  const {
    table,
    setTable,
    rowSelectionModel,
    setRowSelectionModel,
    inventoryTable,
    postIdForDelete,
    fetchInventory,
  } = useMyContext(MyProvider);

  useEffect(() => {
    fetchInventory();
  }, [table]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", type: "number", width: 90 },
    { field: "unit", headerName: "Unit", width: 90 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "firstImage", headerName: "1.ImageURL", width: 800 },
    { field: "secondImage", headerName: "2.ImageURL", width: 800 },
    { field: "thirdImage", headerName: "3.ImageURL", width: 800 },
    { field: "fourthImage", headerName: "4.ImageURL", width: 800 },
  ];

  const handleChange = (event) => {
    const newTable = event.target.value;
    setTable(newTable);
  };

  const handleRefreshTable = () => {
    setRowSelectionModel([]);
    fetchInventory();
  };

  const handleDelete = () => {
    if (rowSelectionModel.length === 0) {
      return null;
    }
    postIdForDelete(rowSelectionModel);
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
    <div
      style={{
        height: 500,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "1rem",
      }}
    >
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
          className="refresh"
          style={{ position: "relative", top: "1.2rem" }}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
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
        pageSize={6}
        checkboxSelection={true}
        style={{ marginBottom: "1rem" }}
        onRowSelectionModelChange={setRowSelectionModel}
        rowSelectionModel={rowSelectionModel}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignContent: "center",
          gap: "6px",
          marginRight: "1rem",
          marginBottom: "rem",
        }}
      >
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
          className="watch"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginTop: "-0.2em" }}
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
          style={{ height: "45rem" }}
        >
          <DialogContent>
            <MDBContainer
              fluid
              style={{
                marginTop: "1.25rem",

                textAlign: "center",
              }}
            >
              <MDBRow
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <MDBCol
                  md="12"
                  lg="7"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MDBCard
                    style={{
                      height: "23rem",
                      minWidth: "10rem",

                      borderRadius: "10px",
                    }}
                  >
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      style={{ width: "100%" }}
                    >
                      <MDBCardImage
                        src={dataDialog.image}
                        fluid
                        style={{
                          height: "6.5rem",
                          borderRadius: "10px 10px 0px 0px",
                          objectFit: "cover",
                          width: "100%",
                        }}
                      />
                      <a href="#!">
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </div>
                      </a>
                    </MDBRipple>
                    <MDBCardBody
                      style={{
                        height: "250px",
                        overflow: "hidden",
                        marginTop: "-0.2rem",
                        borderBottomLeftRadius: "5px",
                        borderBottomRightRadius: "5px",
                        boxShadow:
                          "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
                      }}
                    >
                      <h5
                        style={{
                          marginBottom: "-0.5rem",
                          textDecoration: "underline",
                        }}
                      >
                        {dataDialog.name}
                      </h5>

                      <p
                        style={{
                          position: "relative",
                          bottom: "4px",
                          textDecoration: "underline",
                        }}
                      >
                        {dataDialog.type}
                      </p>

                      <h6 style={{ position: "relative", bottom: "1rem" }}>
                        €{dataDialog.price}/kg
                      </h6>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <span style={{}}>{dataDialog.price}€</span>

                        <input
                          id="inputValue"
                          readOnly
                          value={1}
                          style={{
                            width: "2.8rem",
                            textAlign: "center",
                            position: "relative",
                            display: "block",
                            margin: "0 auto",
                            top: "4px",
                          }}
                          type="number"
                        />
                      </div>

                      <Button variant="contained" style={{ marginTop: "1rem" }}>
                        Add to cart
                      </Button>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            <DialogActions style={{ marginTop: "3rem" }}>
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
