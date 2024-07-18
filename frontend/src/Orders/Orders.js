import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Navbar from "../Home/Components/Dashbord/Navbar";
import BackgroundOrders from "./Components/Backgrounds/BackgroundOrders";
import OrdersTableDB from "./Components/OrdersTable";

export default function OrdersSite() {
  return (
    <Container fluid>
      <Row  className="mt-8">
        <Navbar />
      </Row>
      <Row className="mt-4">
        <Col>
          <BackgroundOrders>
            <OrdersTableDB />
          </BackgroundOrders>
        </Col>
      </Row>
    </Container>
  );
}
