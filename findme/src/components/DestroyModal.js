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
                        Destroy Item(s)
                    </h4>
                    <Button size="sm" variant="outline-primary" onClick={props.onClose} style={{float:"right", marginLeft: "-50%"}}>X</Button>
                </div>
                <div className="modal-body">
                    <Container>
                        <Row>
                            <h5>Are you sure you want to mark these items as destroyed?</h5>
                        </Row>
                    </Container>
                </div>
                <div className="modal-footer">
                    <button>Confirm</button>
                    <button onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DestroyModal;