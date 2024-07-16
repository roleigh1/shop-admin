import React from "react";
import Navbar from "../Home/Components/Dashbord/Navbar";
import { Row, Col, Container } from "react-bootstrap";
import BackgroundBanner from "./Components/Backgrounds/BackgroundBanner";
import BackgroundCards from "./Components/Backgrounds/BackgroundCards";
import Editbanner from "./Components/EditBanner";
import EditCards from "./Components/EditCards";
import "./style.css";
export default function ContentManager() {
  return (
    <Container className="container m-auto">
      <Row className="mt-9">
        <Navbar />
      </Row>
      <Row
        className="mainContent flex gap-5 mt-3"
      
      >
        <Col sm={4}>
          <BackgroundBanner>
            <Editbanner />
          </BackgroundBanner>
        </Col>

        <Col sm={8}>
          <BackgroundCards>
            <EditCards />
          </BackgroundCards>
        </Col>
      </Row>
    </Container>
  );
}