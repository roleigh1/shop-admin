import React from "react";
import Navbar from "../Home/Components/Dashbord/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import BackgroundDelete from "./Components/Backgrounds/BackgroundTable";
import BackgroundInsert from "./Components/Backgrounds/BackgroundInsert";
import InsertData from "./Components/InsertIntroDb";
import InventoryTable from "./Components/ShopTables";
import BackgroundModiTable from "./Components/Backgrounds/BackgroundModify";
import ModifyData from "./Components/ModifyTableData";
import "./style.css"
export default function Inventory() {

    return (
        <Container className="container">
            <Row style={{ }} >

                <Navbar />
            </Row>
            <Row className="insert-Table" style={{display:"flex", gap:"1rem"}} >
                <Col sm={4}>
                    <BackgroundInsert >
                        <InsertData />
                    </BackgroundInsert>
                </Col>
                <Col sm={8}>
                   <BackgroundDelete>
                        <InventoryTable   />
                    </BackgroundDelete>
                </Col>

            </Row>
            <Row  style={{marginTop:"1rem"}}>
                <Col>
                <BackgroundModiTable>
                    <ModifyData />
                </BackgroundModiTable>
                </Col>
            </Row>
        </Container>
    )
}