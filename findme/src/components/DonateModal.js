import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import useFetch from "../Hooks/useFetch";


function DonateModal(props) {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);
    const [phoneNum, setPhoneNum] = useState('');
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [contact, setContact] = useState("");
    function formatPhoneNumber(value) {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    }
    function getCurrentDate(separator = '-') {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
    function getCurrentTime() {
        let newDate = new Date();
        return newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

    }

        const handleInput = (e) => {
            // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            // we'll set the input value using our setInputValue
            setPhoneNum(formattedPhoneNumber);
        }
        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            setIsPending(true);
            fetch("http://localhost:3001/api/insertDonated", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    itemId: props.itemInfo,
                    name: name,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    contact: contact,
                    phone: phoneNum,
                    date: getCurrentDate(),
                    time: getCurrentTime()
                })
            })
            window.location.reload();
            setIsPending(false);
            props.setShow(false);
        }

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Donate Item(s)
                    </h4>
                    <Button size="sm" variant="outline-primary" onClick={props.onClose} style={{float:"right", marginLeft: "-50%"}}>X</Button>
                </div>
                <div className="modal-body">
                    <Container>
                        <Row>
                            <Col md={10}>
                                <Form.Group>
                                    <Form.Label>Charity Name</Form.Label>
                                    <FormControl type="text"
                                                 name="name"
                                                 value={name}
                                                 onChange={(event => setName(event.target.value))}
                                                 placeholder="Enter Charity Name"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={10}>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <FormControl type="text"
                                                 name="address"
                                                 value={address}
                                                 onChange={(event => setAddress(event.target.value))}
                                                 placeholder="Enter Address"/>
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text"
                                              name="city"
                                              value={city}
                                              onChange={(event => setCity(event.target.value))}
                                              placeholder="Enter City"></Form.Control>
                            </Col>
                            <Col md={2}>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text"
                                                  name="state"
                                                  maxLength = "2"
                                                  value={state}
                                                  onChange={event => setState(event.target.value)}
                                                  ></Form.Control>
                            </Col>
                            <Col md={3}>
                                <Form.Label>Zip</Form.Label>
                                <Form.Control type="text"
                                              name="zip"
                                              maxLength = "5"
                                              value={zip}
                                              onChange={event => setZip(event.target.value)}
                                ></Form.Control>
                            </Col>
                        </Row>

                                <Row>
                                    <Col className="smallLabel"><Form.Label>Contact Information</Form.Label></Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text"
                                              name="contactName"
                                              value={contact}
                                              onChange={event => setContact(event.target.value)}
                                ></Form.Control>
                            </Col>
                            <Col md={5}>
                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="input" name="phone" onChange={(e) => handleInput(e)}
                                                  value={phoneNum} placeholder="(###)###-####"/>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Container>
                </div>
                <div className="modal-footer">
                    <button onClick={handleSubmit}>Donate</button>
                    <button onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default DonateModal;