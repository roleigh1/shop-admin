import React from "react";
import Navbar from "../Home/Components/Dashbord/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import BackgroundDelete from "./Components/Backgrounds/BackgroundTable";
import BackgroundInsert from "./Components/Backgrounds/BackgroundInsert";
import InsertData from "./Components/InsertIntroDb";
import InventoryTable from "./Components/ShopTables";

import "./style.css";
export default function Inventory() {
  return (
    <Container className="container m-auto">
      <Row className="mt-8" >
        <Navbar />
      </Row>
      <Row
        className="insert-Table flex gap-4 mt-8"
     
      >
        <Col sm={4}>
          <BackgroundInsert>
            <InsertData />
          </BackgroundInsert>
        </Col>
        <Col sm={8}>
          <BackgroundDelete>
            <InventoryTable />
          </BackgroundDelete>
        </Col>
      </Row>
    </Container>
  );
}
