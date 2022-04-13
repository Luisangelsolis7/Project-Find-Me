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


function DonateModal(props) {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    if (!props.show) {
        return null;
    }
    // const handleSubmit = (e) => {
    //     e.preventDefault(); // prevent page from auto refresh
    //     setIsPending(true);
    //     fetch("http://localhost:3001/api/insertClaimed", {
    //         method: 'POST',
    //         headers: {"Content-type": "application/json"},
    //         body: JSON.stringify({
    //             itemId: props.itemInfo,
    //             firstName: fName,
    //             lastName: lName,
    //             email: emailAdd,
    //             phone: phoneNum,
    //             dob: dob,
    //             driverLicense: driverLicense,
    //             date: getCurrentDate(),
    //             time: getCurrentTime()
    //         })
    //     }).then(() => {
    //         setIsPending(false);
    //         navigate('/Home'); // adding go back 1 page-
    //     })
    // }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Donation Information
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
                    <button>Donate</button>
                    <button onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default DonateModal;