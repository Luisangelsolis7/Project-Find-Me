import NavBar from "../components/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FormControl, FormGroup} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import React, {useState} from "react";
import axios from "../api/axios";

const Report =  (props) => {
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [desc, setDesc] = useState('');
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dl, setDl] = useState('');
    const [auId, setAuId] = useState('');


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

    const handleInput = (e) => {
        // this is where we'll call our future formatPhoneNumber function that we haven't written yet.
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue
        setPhone(formattedPhoneNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        try{
            const response =  axios.post('/api/insertLost', JSON.stringify({
                itemName: itemName,
                category: category,
                location: location,
                date: date,
                time: time,
                desc: desc,
                firstName: fName,
                lastName: lName,
                email: email,
                phone: phone,
                dl: dl,
                auID: auId
                })
            )
            alert("Item Submitted");
            setFName("");
            setLName("");
            setEmail("");
            setDesc("");
            setDl("");
            setAuId("");
            setTime("");
            setDate("");
            setValue('');
            setCategory('');
            setItemName('');
            setPhone('');

        }catch (err){
            if (err) {
                console.error(err)
            }
        }

    }

    return (
        <div className="ReportBackground">
            <NavBar/>
            <Container>
                <br />
                <form onSubmit={handleSubmit}>
                    <h1 className="ReportTitle" > Lost Item Form</h1>
                    <Row>
                        <Row className="centered">
                            <Col md={5}>
                                <FormGroup>
                                    <Form.Label>Item Name</Form.Label>
                                    <FormControl type="text"
                                                 name="itemName"
                                                 value={itemName}
                                                 onChange={event => setItemName(event.target.value) }
                                                 maxLength="50"
                                                 placeholder="Ex: Black Iphone, Red Beanie"/>
                                </FormGroup>
                            </Col>

                            <Col md={5}>
                                <FormGroup>
                                    <Form.Label>Item Category</Form.Label>
                                    <select className="form-select" id="inputGroupSelect04"
                                            name="category"
                                            onChange={event => setCategory(event.target.value)}
                                            aria-label="Example select with button addon">
                                        <option defaultValue="">---Categories---</option>
                                        <option value="electronic">Electronic</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="accessory">Accessory</option>
                                        <option value="key">Key</option>
                                        <option value="id">Identification</option>
                                        <option value="misc">Misc</option>
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="centered">
                            <Col md={5}>
                                <Form.Label>Value</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl name="value" value={value}
                                                 onChange={event => setValue(event.target.value)}
                                                 aria-label="Amount (to the nearest dollar)"/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Col>
                            <Col md={5}>
                                <Form.Label>Location Lost</Form.Label>
                                <select className="form-select" id="inputGroupSelect05"
                                        name="location"
                                        onChange={event => setLocation(event.target.value)}
                                        aria-label="Example select with button addon">
                                    {props.locations.map((i) => (
                                        <option key={i} value={i}>{i}</option>
                                    ))}
                                </select>
                            </Col>
                        </Row>
                        <Row className="centered">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control type="date" name="date" onChange={event => setDate(event.target.value)} value={date}/>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Time Lost</Form.Label>
                                    <Form.Control type="time" name="time" onChange={event => setTime(event.target.value)}
                                                  value={time}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="centered">
                            <Col md={7}>
                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" value={desc}
                                                  name="desc"
                                                  maxLength="255"
                                                  onChange={event => setDesc(event.target.value)} rows={4}
                                                  className="col-md-6"></Form.Control>

                                </Form.Group>
                            </Col>
                        </Row>

                        <div></div>
                        <Row className="centered">
                            <Col className="smallLabel"><Form.Label>  Reporter Information</Form.Label></Col>
                        </Row>
                        <Row className="centered">
                            <Col md={5}>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <FormControl type="text"
                                                 name="firstName"
                                                 value={fName}
                                                 onChange={event => setFName(event.target.value)}
                                                 maxLength="35"
                                                 placeholder="Enter First Name"/>
                                </Form.Group>
                            </Col>
                            <Col md={5}>
                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <FormControl type="text"
                                                 name="lastName"
                                                 maxLength="35"
                                                 value={lName}
                                                 onChange={event => setLName(event.target.value)}
                                                 placeholder="Enter Last Name"/>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="centered">
                            <Col md={6}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email"
                                              name="email"
                                              value={email}
                                              onChange={event => setEmail(event.target.value)}
                                              maxLength="50"
                                              placeholder="Enter Email"></Form.Control>
                            </Col>
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control type="input" name="phone" onChange={(e) => handleInput(e)} value={phone} placeholder="(###)###-####"/>
                                </Form.Group>
                            </Col>
                            <Row className="centered">
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>Driver's License/State ID</Form.Label>
                                        <Form.Control type="input" name="ID"
                                                      onChange={event => setDl(event.target.value)}
                                                      value={dl}
                                                      maxLength="20"
                                                      placeholder="Enter Driver's License/State ID"/>
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group>
                                        <Form.Label>AU ID</Form.Label>
                                        <Form.Control type="input"
                                                      name="AUID"
                                                      onChange={event => setAuId(event.target.value)}
                                                      maxLength="20"
                                                      value={auId}
                                                      placeholder="Enter AU ID"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Row>
                        <Row md={1} className="centered">
                            <Col className="submitButton">
                                <input type="submit" value="Submit" className="btn btn-success" />
                            </Col>
                        </Row>
                    </Row>
                </form>
                <br/>
                <br/>
                <br/>
                <br/>

            </Container>
        </div>
    )
}
export default Report;