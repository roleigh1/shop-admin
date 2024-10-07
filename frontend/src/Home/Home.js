import React from "react";
import Navbar from "./Components/Dashbord/Navbar";
import Background from "./Components/Dashbord/board/Backgrounds/Background";
import BackgroundLastOrdersListed from "./Components/Dashbord/board/Backgrounds/BackroundLastOrdersListed";
import { Row, Col, Container } from "react-bootstrap";
import OrderCounter from "./Components/Dashbord/board/OrderCounter";
import BackgroundSales from "./Components/Dashbord/board/Backgrounds/BackgroundSales";
import LastOrderTable from "./Components/Dashbord/board/ContentTableLastOrder";
import SalesLineChart from "./Components/Dashbord/board/SalesChart";
import "./home.css";
import SalesTotal from "./Components/Dashbord/board/SalesTotal";

export default function Home() {
  return (
    <Container className="m-auto" >
      <Row className="mt-8">
        <Navbar />
      </Row>

      <Row className="flex gap-4 mt-2 topRow">
        <Col>
          <Background>
            <OrderCounter />
          </Background>
        </Col>
        <Col>
          <BackgroundLastOrdersListed>
            <LastOrderTable />
          </BackgroundLastOrdersListed>
        </Col>
      </Row>
      <Row className="mt-4 midRow">
        <BackgroundSales>
          <Col>
            <SalesLineChart />
          </Col>

          <Col>
            <SalesTotal />
          </Col>
        </BackgroundSales>
      </Row>
    </Container>
  );
}
