import React from 'react';
import NavBar from "../components/NavBar";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl, FormGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";


class ReportForm extends React.Component {
    constructor(props) {
        super();
        this.state = {
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);

            let input = {};
            input["firstName"] = "";
            input["lastName"] = "";
            input["email"] = "";
            input["phone"] = "";
            input["comment"] = "";
            this.setState({input: input});

            alert('Demo Form is submited');
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["firstName"]) {
            isValid = false;
            errors["firstName"] = "Please enter your first name.";
        }
        if (!input["lastName"]) {
            isValid = false;
            errors["lastName"] = "Please enter your last name.";
        }

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email address.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["value"]) {
            isValid = false;
            errors["value"] = "Please enter a value for the item.";
        }
        if (!input["phone"]) {
            isValid = false;
            errors["phone"] = "Please enter your phone number.";
        }
        if (!input["itemName"]) {
            isValid = false;
            errors["itemName"] = "Please enter item name.";
        }

        if (typeof input["phone"] !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
            if (!pattern.test(input["phone"])) {
                isValid = false;
                errors["phone"] = "Please enter only numbers without any characters.";
            } else if (input["phone"].length != 10) {
                isValid = false;
                errors["phone"] = "Please enter valid phone number.";
            }
        }

        if (!input["comment"]) {
            isValid = false;
            errors["comment"] = "Please enter a small description.";
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div className="ReportBackground">
            <NavBar/>
            <Navbar.Brand href="/"><img class="resize" src={require("../imgs/AULogo.jpg")}/></Navbar.Brand>
            <Container>
                <form onSubmit={this.handleSubmit}>
                    <h1 className="ReportTitle"> Lost Item Form</h1>
                    <Row className="justify-content-md-center">
                        <Row>
                            <Col md={5}>
                                <FormGroup>
                                    <Form.Label>Item Name</Form.Label>
                                    <FormControl type="text"
                                                 name="itemName"
                                                 value={this.state.input.itemName}
                                                 onChange={this.handleChange}
                                                 placeholder="Enter Item Name"/>
                                    <div className="text-danger">{this.state.errors.itemName}</div>
                                </FormGroup>
                            </Col>

                            <Col md={6}>
                                <FormGroup>
                                    <Form.Label>Item Category</Form.Label>
                                    <select className="form-select" id="inputGroupSelect04"
                                            aria-label="Example select with button addon">
                                        <option value="electronic">Electronic</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="accessory">accessory</option>
                                        <option value="id">Identification</option>
                                        <option value="misc">Misc</option>
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <Form.Label>Value</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl aria-label="Amount (to the nearest dollar)"/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                                <div className="text-danger">{this.state.errors.value}</div>
                                <Form.Group>
                                    <Form.Label>Location Lost</Form.Label>
                                    <select className="form-select" id="inputGroupSelect04"
                                            aria-label="Example select with button addon">
                                        {this.props.locations.map((i) => (
                                            <option key={i}>{i}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={7}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" value={this.state.input.comment}
                                                  onChange={this.handleChange} rows={4}
                                                  className="col-md-6"></Form.Control>

                                    <div className="text-danger">{this.state.errors.comment}</div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row >
                            <Col className="smallLabel"><Form.Label>Reporter Information</Form.Label></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <FormControl type="text"
                                                 name="name"
                                                 value={this.state.input.firstName}
                                                 onChange={this.handleChange}
                                                 placeholder="Enter First Name"/>
                                    <div className="text-danger">{this.state.errors.firstName}</div>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <FormControl type="text"
                                                 name="lastName"
                                                 value={this.state.input.lastName}
                                                 onChange={this.handleChange}
                                                 placeholder="Enter Last Name"/>
                                    <div className="text-danger">{this.state.errors.lastName}</div>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group controlId="dob">
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Date of Birth"/>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="input" placeholder="(xxx)xxx-xxxx"/>
                                    <div className="text-danger">{this.state.errors.phone}</div>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Time Lost</Form.Label>
                                    <Form.Control type="time" name="time" placeholder="12:00 pm"></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              name="email"
                                              value={this.state.input.email}
                                              onChange={this.handleChange}
                                              placeholder="Email"></Form.Control>
                                <div className="text-danger">{this.state.errors.email}</div>
                            </Col>
                        </Row>
                        <Row md={1}>
                            <Col className="submitButton">
                                <input type="submit" value="Submit" className="btn btn-success"/>
                            </Col>
                        </Row>
                    </Row>
                </form>
                <br />
                <br />
                <br />
                <br />

            </Container>
    </div>
    )
    }
}

export default ReportForm;












