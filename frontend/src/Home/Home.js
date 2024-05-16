import React from "react";
import Navbar from "./Components/Dashbord/Navbar";
import Background from "./Components/Dashbord/board/Backgrounds/Background";
import BackgroundLastOrdersListed from "./Components/Dashbord/board/Backgrounds/BackroundLastOrdersListed";
import { Row, Col, Container } from "react-bootstrap";
import OrderCounter from "./Components/Dashbord/board/ContenCount";
import BackgroundSales from "./Components/Dashbord/board/Backgrounds/BackgroundSales";
import LastOrderTable from "./Components/Dashbord/board/ContentTableLastOrder";
import SalesLineChart from "./Components/Dashbord/board/SalesChart";
import "./home.css";
import SalesTotal from "./Components/Dashbord/board/SalesTotal";
export default function Home() {
  return (
    <Container>
      <Row style={{}}>
        <Navbar />
      </Row>

      <Row
        className="topRow"
        style={{ display: "flex", gap: "1rem", marginTop: "-1rem" }}
      >
        <Col>
          <Background>
            <OrderCounter />
          </Background>
        </Col>
        <Col>
          <BackgroundLastOrdersListed style={{ width: "1rem" }}>
            <LastOrderTable />
          </BackgroundLastOrdersListed>
        </Col>
      </Row>
      <Row className="midRow" style={{ marginTop: "1rem" }}>
        <BackgroundSales>
          <Col>
            <SalesLineChart />
          </Col>

          <Col>
            <SalesTotal></SalesTotal>
          </Col>
        </BackgroundSales>
      </Row>
    </Container>
  );
}
