import NavBar from "../components/NavBar";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Popover} from "react-bootstrap";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const ReportForm = () => {
    return (
        <div style={{backgroundColor:"lightsalmon"}}>
            <NavBar />
            <Container>
                <Row>
                    <Col xs lg="2"></Col>
                    <Col>
                        First, last, Driver's license, DOB, email, phone

                        
                    </Col>
                    <Col xs lg="2"></Col>
                </Row>
            </Container>
            </div>

    )
};
export default ReportForm;