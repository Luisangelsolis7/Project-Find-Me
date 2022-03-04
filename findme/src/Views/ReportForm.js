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
import {Dropdown} from "react-bootstrap";


const ReportForm = () => {
    let category = "Category ";

    function changeCat(cat) {
        category = cat;
    }

    return (
        <div style={{backgroundColor:"lightsalmon"}}>
            <NavBar />
            <Container>
                <Row>
                    <Col xs lg="2"></Col>
                    <Col>
                        <Row>
                            <Col>
                            Item Name <input type="text" />
                            </Col>
                            <Col>
                            {category}<Dropdown>
                            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="dark">
                                <Dropdown.Item href="#/action-1" active>
                                    Action
                                </Dropdown.Item>
                                <Dropdown.Item onClick={changeCat()}>Electronic</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                            </Col>
                        </Row>
                        "itemName": "All About Money",
                        "itemCategory": "",
                        "itemDescription": "Its about the root of all evil",
                        "itemValue": "This ariticle is a complete guide about money. Its nice to have but not eveyone has it.",
                        "userFirst": "",
                        "userLast": "",
                        "userDOB": "",
                        "userPhone": "",
                        "userEmail": "",
                        "date": "",
                        "time": "",
                        "location": ""
                        }


                        
                    </Col>
                    <Col xs lg="2"></Col>
                </Row>
            </Container>
            </div>

    )
};
export default ReportForm;