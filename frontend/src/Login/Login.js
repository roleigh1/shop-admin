import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import { FormSignIn } from "./Form";
import PropTypes from "prop-types";
export function LoginPage({ onTokenReceived }) {
  return (
    <Container className="m-auto">
      <Row>
        <Col>
          <FormSignIn onTokenReceived={onTokenReceived} />
        </Col>
      </Row>
    </Container>
  );
}

LoginPage.propTypes = {
  onTokenReceived: PropTypes.func.isRequired,
};
