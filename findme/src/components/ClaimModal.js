import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {FormControl} from "react-bootstrap";
import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";



function ClaimModal(props) {
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [dob, setDOB] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    const [dlState, setDlState] = useState("");
    const [phoneNum, setPhoneNum] = useState('');
    const [AUID, setAUID] = useState('');

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

    {
        const handleInput = (e) => {
            // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            // we'll set the input value using our setInputValue
            setPhoneNum(formattedPhoneNumber);
        };

        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            try{
                const response =  axiosPrivate.post('/api/insertClaimed', JSON.stringify({
                    itemId: props.itemInfo,
                    firstName: fName,
                    lastName: lName,
                    email: emailAdd,
                    phone: phoneNum,
                    dob: dob,
                    dl: driverLicense,
                    dlState: dlState,
                    AUID: AUID,
                    date: getCurrentDate(),
                    time: getCurrentTime(),
                    badge: auth.badge
                    })
                )
                props.setShow(false);

            }catch (err){
                if (err) {
                    console.error(err)
                }
            }

        }

        if (!props.show) {
            return null;
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Release Item(s)
                        </h4>
                        <Button size="sm" variant="outline-primary" onClick={props.onClose} style={{float:"right", marginLeft: "-50%"}}>X</Button>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>First Name</Form.Label>
                                        <FormControl type="text"
                                                     name="firstName"
                                                     value={fName}
                                                     onChange={(event => setFName(event.target.value))}
                                                     placeholder="Enter First Name"/>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group>
                                        <Form.Label>Last Name</Form.Label>
                                        <FormControl type="text"
                                                     name="lastName"
                                                     value={lName}
                                                     onChange={(event => setLName(event.target.value))}
                                                     placeholder="Enter Last Name"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={7}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                                  name="email"
                                                  value={emailAdd}
                                                  onChange={(event => setEmailAdd(event.target.value))}
                                                  placeholder="Email"></Form.Control>

                                </Col>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type="input" name="phone" onChange={(e) => handleInput(e)}
                                                      value={phoneNum} placeholder="(###)###-####"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>AU ID</Form.Label>
                                        <Form.Control type="input"
                                                      name="AUID"
                                                      onChange={event => setAUID(event.target.value)}
                                                      maxLength="20"
                                                      value={AUID}
                                                      placeholder="Enter AU ID"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="smallLabel"><Form.Label>Driver's License</Form.Label></Col>
                            </Row>
                            <Row>
                            <Col md={2}>
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text"
                                              name="state"
                                              maxLength = "2"
                                              value={dlState}
                                              onChange={event => setDlState(event.target.value)}
                                ></Form.Control>
                            </Col>
                                <Col md={5}>
                                    <Form.Label>Number</Form.Label>
                                    <Form.Control type="text"
                                                  name="driverLicense"
                                                  value={driverLicense}
                                                  onChange={event => setDriverLicense(event.target.value)}
                                                  placeholder="Driver's License"></Form.Control>
                                </Col>
                                <Col md={4}>
                                    <Form.Label>DOB</Form.Label>
                                    <Form.Control type="date"
                                                  name="dob"
                                                  value={dob}
                                                  onChange={event => setDOB(event.target.value)}
                                    ></Form.Control>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSubmit}>Release</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }



}

export default ClaimModal;