import React from 'react';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
const Login = function() {
    return (
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>

            <Row style={{marginRight: 0, marginLeft: 0 ,backgroundColor:"sandybrown"}}>
                <Col></Col>
                <Col>
                    <h1>Log-In</h1>
                    <br />
                    <br />
                <Form>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Button variant="primary" href="/Home" type="submit">
                                Submit
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" href="/" type="submit">
                                Back
                            </Button>
                        </Col>
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                    </Row>



                </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}
export default Login;