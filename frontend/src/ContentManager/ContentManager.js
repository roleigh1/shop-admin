import React from "react";
import Navbar from "../Home/Components/Dashbord/Navbar";
import { Row, Col, Container } from "react-bootstrap";
import BackgroundBanner from "./Components/Backgrounds/BackgroundBanner";
import BackgroundCards from "./Components/Backgrounds/BackgroundCards";
import Editbanner from "./Components/EditBanner";
import EditCards from "./Components/EditCards";
import "./style.css"
export default function ContentManager() {
  return (
    <Container className="container">
      <Row style={{ marginTop: "2rem" }}>
        <Navbar />
      </Row>
      <Row className="mainContent" style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
        <Col sm={4}> 
          <BackgroundBanner>
            <Editbanner />
          </BackgroundBanner>
        </Col>

        <Col  sm={8}>
          <BackgroundCards>
            <EditCards />
          </BackgroundCards>
        </Col>
      </Row>
    </Container>
  );
}
