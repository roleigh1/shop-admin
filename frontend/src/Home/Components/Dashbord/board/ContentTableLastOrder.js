import React ,{useEffect}from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { MyProvider, useMyContext } from "../../../../ContextApi";


export default function LastOrderTable() {
  const { lastOrder,fetchLastOrder } = useMyContext(MyProvider);
  useEffect(()=> {
    fetchLastOrder()
  },[])
  return (
    <div >
      <h5 className="text-center relative top-4">
        Last 5 orders received
      </h5>
      <div className="max-h-[300px] overflow-y-scroll" >
        <TableContainer
          className="bg-[#ebeceb] mt-6 h-[15rem]"
          component={Paper}
        >
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
