import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";


function Modal(props) {
    const navigate = useNavigate;
    const [cat, setCat] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [name, setName] = useState("");
    const [val, setValue] = useState("");
    const [des, setDesc] = useState("");
    const [loc, setLocation] = useState("");
    const [dat, setDate] = useState("");
    const [tim, setTime] = useState("");
    const [dob, setDOB] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    const [phoneNum, setPhoneNum] = useState('');
    const [isPending, setIsPending] = useState(false);
    if (!props.show) {
        return null;
    }


    if(props.active === "Claim"){
        const handleInput = (e) => {
            // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
            const formattedPhoneNumber = formatPhoneNumber(e.target.value);
            // we'll set the input value using our setInputValue
            setPhoneNum(formattedPhoneNumber);
        };

        function formatPhoneNumber(value) {
            // if input value is falsy eg if the user deletes the input, then just return
            if (!value) return value;

            // clean the input for any non-digit values.
            const phoneNumber = value.replace(/[^\d]/g, '');

            // phoneNumberLength is used to know when to apply our formatting for the phone number
            const phoneNumberLength = phoneNumber.length;

            // we need to return the value with no formatting if its less then four digits
            // this is to avoid weird behavior that occurs if you  format the area code to early

            if (phoneNumberLength < 4) return phoneNumber;

            // if phoneNumberLength is greater than 4 and less the 7 we start to return
            // the formatted number
            if (phoneNumberLength < 7) {
                return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
            }

            // finally, if the phoneNumberLength is greater then seven, we add the last
            // bit of formatting and return it.
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
                3,
                6
            )}-${phoneNumber.slice(6, 10)}`;
        }
        function getCurrentDate(separator='-'){

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();

            return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
        }

        function getCurrentTime(){

            let newDate = new Date()
            let time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

            return time;
        }



        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            setIsPending(true);
            fetch("http://localhost:3001/api/insertClaimed", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    itemId : null,
                    firstName : fName,
                    lastName : lName,
                    email : emailAdd,
                    phone : phoneNum,
                    dob : dob,
                    driverLicense : driverLicense,
                    date : getCurrentDate(),
                    time : getCurrentTime()
                })
            }).then(() => {
                setIsPending(false);
                navigate('/Home'); // adding go back 1 page-
            })
        }
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Release an Item
                        </h4>
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
                                        <Form.Control type="input" name="phone" onChange={(e) => handleInput(e)} value={phoneNum}  placeholder="(###)###-####"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={8}>
                                    <Form.Label>Driver's License</Form.Label>
                                    <Form.Control type="text"
                                                  name="driverLicense"
                                                    value={driverLicense}
                                                    onChange={event => setDriverLicense(event.target.value)}
                                                    placeholder="Driver's License"></Form.Control>
                                </Col>
                                <Col md={4}>
                                    <Form.Label>Date of Birth</Form.Label>
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
                        <button onClick={handleSubmit}>Add</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }
    if (props.active === "Add") {
        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            setIsPending(true);
            fetch("http://localhost:3001/api/insertUnclaimed", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({itemName: name,
                    category: cat,
                    desc : des,
                    value: val,
                    location : loc,
                    date : dat,
                    time : tim
                })
            }).then(() => {
                setIsPending(false);
                navigate('/Home'); // adding go back 1 page-
            })
        }
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
                                Item Name:<input value={name} onChange={(event => setName(event.target.value))}
                                                 type="text"/>
                            </Row>
                            <Row>
                                Item Category:<select className="form-select" id="inputGroupSelect04"
                                                      value={cat}
                                                      onChange={(event => setCat(event.target.value))}
                                                      aria-label="Example select with button addon">
                                <option value="">--Category--</option>
                                <option value="electronic">Electronic</option>
                                <option value="clothing">Clothing</option>
                                <option value="currency">Currency</option>
                                <option value="accessory">Accessory</option>
                                <option value="id">Identification</option>
                                <option value="misc">Misc</option>
                            </select>
                            </Row>
                            <Row>
                                Description:
                                <input value={des} onChange={(event => setDesc(event.target.value))}
                                       type="textarea"/>
                            </Row>
                            <Row>
                                <Form.Label>Value</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl name="value" value={val}
                                                 onChange={(event => setValue(event.target.value))}
                                                 aria-label="Amount (to the nearest dollar)"/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Row>
                            <Row>
                                Location Found:
                                <input value={loc} onChange={(event => setLocation(event.target.value))}
                                       type="text"/>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control type="date" name="date"
                                                      onChange={event => setDate(event.target.value)} value={dat}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Time Lost</Form.Label>
                                        <Form.Control type="time" name="time"
                                                      onChange={(e) => setTime(e.target.value)}
                                                      value={tim}></Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSubmit}>Add</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )

    }
    if (props.active === "L") {
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
    if (props.active === "Edit") {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Edit
                        </h4>
                    </div>
                    <div className="modal-body">
                        <Container>

                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-success">Save</button>
                        <button className="btn btn-success" onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Modal;