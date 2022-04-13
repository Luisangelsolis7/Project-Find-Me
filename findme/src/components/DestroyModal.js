import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import useFetch from "../useFetch";


function DestroyModal(props) {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Disposal Information
                    </h4>
                </div>
                <div className="modal-body">
                    <Container>
                        <Row>
                            Enter information
                        </Row>
                    </Container>
                </div>
                <div className="modal-footer">
                    <button>Remove Items</button>
                    <button onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default DestroyModal;