import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React from "react";

function LoginModal(props) {
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
export default LoginModal;