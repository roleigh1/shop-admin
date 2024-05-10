import React from "react";
import { Row,Col,Container } from "react-bootstrap";
import Navbar from "../Home/Components/Dashbord/Navbar";
import BackgroundOrders from "./Components/Backgrounds/BackgroundOrders";
import OrdersTableDB from "./Components/OrdersTable";

export default function OrdersSite(){
    return (
        <Container fluid>
       
        <Row  style={{   }}> 
                <Navbar />
            </Row>
            <Row  >
                <Col>
                 <BackgroundOrders  >

                    <OrdersTableDB />
                 </BackgroundOrders>
                </Col>
            </Row>
      
        


        </Container>
    )
}