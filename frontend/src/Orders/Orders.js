import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Navbar from "../Home/Components/Dashbord/Navbar";
import BackgroundOrders from "./Components/Backgrounds/BackgroundOrders";
import OrdersTableDB from "./Components/OrdersTable";

export default function OrdersSite() {
  return (
    <div fluid>
      <div className="mt-10">
        <Navbar />
      </div>
      <div className="topRow flex items-center justify-center gap-4 mt-20">
        <div>
          <BackgroundOrders>
            <OrdersTableDB />
          </BackgroundOrders>
        </div>
      </div>
    </div>
  );
}
