import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import { MyProvider, useMyContext } from "../../../../ContextApi";

export default function LastOrderTable() {
  const { lastOrder } = useMyContext(MyProvider);

  return (
    <div>
      <h5 className="text-center relative top-1  text-sm">
        eingetroffene Bestellung
      </h5>
      <div className="max-h-72 mt-2 overflow-y-scroll">
        <TableContainer component={Paper} className="bg-[#ebeceb]">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-xs">ID</TableCell>
                <TableCell className="text-xs">Email</TableCell>
                <TableCell className="text-xs">Items</TableCell>
                <TableCell className="text-xs">Pickup date</TableCell>
                <TableCell className="text-xs">Order created</TableCell>
                <TableCell className="text-xs">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastOrder.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-xs">{order.id}</TableCell>
                  <TableCell className="text-xs">{order.email}</TableCell>
                  <TableCell className="text-xs">{order.items}</TableCell>
                  <TableCell className="text-xs">{order.pickupdate}</TableCell>
                  <TableCell className="text-xs">{order.created}</TableCell>
                  <TableCell className="text-xs">{order.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
