import React from "react";
import { Col,Row ,Container} from "react-bootstrap";
import { FormSignIn } from "./Form";
export function LoginPage({ onTokenReceived}) {
    return (
        <Container >
            <Row>
                <Col >
                    <FormSignIn onTokenReceived={onTokenReceived}/>
                </Col>
            </Row>
        </Container>
    )
}