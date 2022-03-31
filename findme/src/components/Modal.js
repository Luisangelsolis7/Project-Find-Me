import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function Modal(props) {
    if (!props.show) {
        return null;
    }
    if (props.active == "H") {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Log an Unclaimed Item
                        </h4>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row>
                                Item Name:<input type="text"/>
                            </Row>
                            <Row>
                                Item Category:<select className="form-select" id="inputGroupSelect04"
                                                      aria-label="Example select with button addon">
                                <option value="electronic">Electronic</option>
                                <option value="clothing">Clothing</option>
                                <option value="accessory">accessory</option>
                                <option value="id">Identification</option>
                                <option value="misc">Misc</option>
                            </select>
                            </Row>
                            <Row>
                                Description:
                                <input type="typearea"/>
                            </Row>

                            <Row>
                                Location Found:
                                <select>

                                </select>
                            </Row>
                            <Row>
                                Date Found:
                                <input type="Date"/>
                                    Time Found:
                                <input type="Time"/>
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button>Add</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )

    }
    if (props.active == "L") {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Admin Log-in
                        </h4>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email"/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password"/>
                                </Form.Group>
                            </Form>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <Link to="/Home">
                        <button className="btn btn-success">Log In</button>
                        </Link>
                        <button className="btn btn-success" onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal;