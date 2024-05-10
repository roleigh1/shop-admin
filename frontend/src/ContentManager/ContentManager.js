import React from "react";
import Navbar from "../Home/Components/Dashbord/Navbar";
import { Row, Col, Container } from "react-bootstrap";
import BackgroundBanner from "./Components/Backgrounds/BackgroundBanner";
import BackgroundCards from "./Components/Backgrounds/BackgroundCards";
import Editbanner from "./Components/EditBanner";
export default function ContentManager() {
  return (
    <Container>
      <Row>
        <Navbar />
      </Row>
      <Row style={{display:"flex",gap:"2rem"}}>
        <Col>
        <BackgroundBanner >
            <Editbanner  />
        </BackgroundBanner>
        </Col>

        <Col>
        <BackgroundCards>

        </BackgroundCards>
        </Col>
     </Row>
    </Container>
  );
}
