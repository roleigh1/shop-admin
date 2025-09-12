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
    <div>
      <div className="mt-10">
        <Navbar />
      </div>

      <div
        className="topRow flex items-center justify-center gap-4 mt-3">
        <div>
          <Background>
            <OrderCounter />
          </Background>
        </div>
        <div>
          <BackgroundLastOrdersListed >
            <LastOrderTable />
          </BackgroundLastOrdersListed>
        </div>
      </div>
      <div className="midRow flex items-center justify-center mt-4" >
        <BackgroundSales>
          <div>
            <SalesLineChart />
          </div>

          <Col>
            <SalesTotal></SalesTotal>
          </Col>
        </BackgroundSales>
      </div>
    </div>
  );
}
