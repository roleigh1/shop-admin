import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MyProvider, useMyContext } from "../../ContextApi";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import { POST_DELETE } from "../../config/apiPaths";
import Pagination from "./PaginationComponent";
import "./style.css"
const api_Host = process.env.REACT_APP_API_HOST;
import "./style.css";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "item", headerName: "Items", width: 300 },
  { field: "total", headerName: "Total", type: "number", width: 120 },
  {
    field: "pickupdate",
    headerName: "Pickup Date",
    type: "date",
    width: 150,
    valueGetter: (params) => new Date(params.row.pickupdate),
  },
  { field: "location", headerName: "Market", width: 120 },
  { field: "createdAt", headerName: "Created", width: 220 },
];

export default function OrdersTableDB() {
  const [newValue, setNewValue] = useState("new");
  const [searchID, setSearchID] = useState(0);
  const [foundData, setFoundData] = useState({});
  const [open, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const {
    rowSelectionModelOrders,
    setRowSelectionModelOrders,
    orderFinishProcess,
    fetchAllOrders,
    pageState,
    tableOrders,
    setTableOrders,
    setPageState,
    setFlagOrders,
  } = useMyContext(MyProvider);

  const handlePageChange = () => {
    console.log(rowSelectionModelOrders);
    orderFinishProcess(rowSelectionModelOrders);

  };

  const handleChange = (event) => {
    const value = event.target.value;
    setTableOrders(value);
    setNewValue(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleIdSearch = () => {
    let newId = Number(searchID);
    const data = [...pageState.data];

    function binarySearch(data, newId) {
      data.sort((a, b) => {
        return a.id - b.id;
      });

      let left = 0,
        right = data.length - 1;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (data[mid].id === newId) {
          setFoundData(data[mid]);
          handleClickOpen();
          setNotFound(false);
          return;
        } else if (data[mid].id < newId) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      setNotFound(true);
      setFoundData(null);
      handleClickOpen();
    }

    binarySearch(data, newId);
    setSearchID("");
  };
  const handleSearchIDChange = (e) => {
    setSearchID(e.target.value);
  };

  const handleDelete = async () => {
    let idForDelete = rowSelectionModelOrders;
    console.log(idForDelete);
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idForDelete }),
    };
    fetch(`${api_Host}${POST_DELETE}orders`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("res recived", data);
        setRowSelectionModelOrders("")
        fetchAllOrders()
      })
      .catch((error) => {
        console.error("Error sending req", error);
      });
  };

  useEffect(() => {
    setFlagOrders(true);
    fetchAllOrders();

  }, [newValue, pageState.page, foundData]);
  useEffect(() => {
    console.log("Updated pageState:", pageState);
  }, [pageState]);
  useEffect(() => {}, []);
  const handleClose = () => {
    setOpen(false);
    setNotFound(false);
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div>
      <div className="main  mt-2 mb-8">
        <div className="top-actions ml-5 ">
          <Select
            className="select mb-2 ml-2"
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={tableOrders}
            label="table"
            onChange={handleChange}
          >
            <MenuItem value={"new"}>New orders</MenuItem>
            <MenuItem value={"finished"}>Done orders</MenuItem>
          </Select>
          <Button
            className="finish realtive left-3"
            style={{
              visibility: tableOrders === "finished" ? "hidden" : "visible",
            }}
            variant="outlined"
            onClick={handlePageChange}
          >
            {" "}
            Finish Order
          </Button>
        </div>

        <div className="dataGriddiv m-auto " style={{ width: "60vw" }}>
          <DataGrid
            style={{ height: "25rem" }}
            className="w-[90%] m-auto table"
            rows={pageState.data}
        
     
            columns={columns}
            loading={pageState.isLoading}
            initialState={{ pagination: {pageState } }}
            pagination
            onRowSelectionModelChange={setRowSelectionModelOrders}
            rowSelectionModel={rowSelectionModelOrders}
            pageSizeOptions={[5, 40, 60]}
            checkboxSelection
          />
          <Pagination pageState={pageState}   className=""  setPageState={setPageState} />
        </div>
        <div className="actions flex flex-row gap-5 ml-2 mt-1">
          <TextField
            id="outlined-basic"
            onChange={handleSearchIDChange}
            className="text-center"
            value={searchID}
            label="Order-ID"
            type="number"
            style={{ width: "100px", height: "20px" }}
            variant="outlined"
          />
          <svg
            onClick={handleIdSearch}
            className="delete"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            style={{ marginTop: "1.2rem" }}
            viewBox="0 0 26 26"
          >
            <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z"></path>
          </svg>
          <svg
            className="delete"
            style={{
              marginTop: "1.2rem",
              visibility: tableOrders === "new" ? "hidden" : "visible",
            }}
            onClick={handleDelete}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
          </svg>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
            Order Found
          </DialogTitle>
          <DialogContent>
            <table>
              <tbody>
                {foundData &&
                  Object.entries(foundData).map(([key, value]) => (
                    <tr key={key}>
                      <td
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {key}:
                      </td>
                      <td>{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={notFound}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            style={{ fontWeight: "bold" }}
          ></DialogTitle>
          <DialogContent>
            <Alert className="notFound" severity="error">
              Order not found!
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
