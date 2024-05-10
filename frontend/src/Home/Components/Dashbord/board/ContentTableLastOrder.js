import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { MyProvider,useMyContext } from "../../../../ContextApi";
import "./content.css";

export default function LastOrderTable() {
  const { lastOrder } = useMyContext(MyProvider); 

  return (
    <div style={{}}>
 <h5 style={{textAlign:"center" ,position:"relative",top:"1rem" }}>eingetroffene Bestellung</h5>
   <div style={{maxHeight:"300px",overflowY:"scroll"}}>

      <TableContainer style={{backgroundColor:"#ebeceb"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Items</TableCell>
            <TableCell>Pickup date</TableCell>
            <TableCell>Order created</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastOrder.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell>{order.pickupdate}</TableCell>
              <TableCell>{order.created}</TableCell>
              <TableCell>{order.totalPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
  );
}
