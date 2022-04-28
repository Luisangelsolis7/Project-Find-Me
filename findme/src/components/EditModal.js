import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";



function EditModal(props) {
    const axiosPrivate = useAxiosPrivate();
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [name, setName] = useState('');
    const [cat, setCat] = useState('');
    const [val, setValue] = useState('');
    const [des, setDesc] = useState('');
    const [loc, setLocation] = useState('');
    const [dat, setDate] = useState('');
    const [tim, setTime] = useState('');
    const [dob, setDOB] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    const [phoneNum, setPhoneNum] = useState('');

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


    function formatDate(inputDate) {
        let date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            // Months use 0 index.
            return date.toISOString().split('T')[0];
        }

    }
    useEffect(() => {
        {props.itemInfo.Item_Name && setName(props.itemInfo.Item_Name)};
        {props.itemInfo.Category_Name && setCat(props.itemInfo.Category_Name)};
        {props.itemInfo.Item_Value && setValue(props.itemInfo.Item_Value)};
        {props.itemInfo.ISH_Location && setLocation(props.itemInfo.ISH_Location)};
        {props.itemInfo.Item_Desc && setDesc(props.itemInfo.Item_Desc)};
        {props.itemInfo.ISH_Date && setDate(formatDate(props.itemInfo.ISH_Date))};
        {props.itemInfo.ISH_Time && setTime(props.itemInfo.ISH_Time)};
        {props.itemInfo.User_Fname && setFName(props.itemInfo.User_Fname)};
        {props.itemInfo.User_Lname && setLName(props.itemInfo.User_Lname)};
        {props.itemInfo.User_Email && setEmailAdd(props.itemInfo.User_Email)};
        {props.itemInfo.User_Phone && setPhoneNum(props.itemInfo.User_Phone)};
        {props.itemInfo.User_DL && setDriverLicense(props.itemInfo.User_DL)};
        {props.itemInfo.User_DOB && setDOB(formatDate(props.itemInfo.User_DOB))};
    },[props.show, props.itemInfo]);

    if (!props.show) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        try{
            const response =  axiosPrivate.post('/api/edit', JSON.stringify({
                itemId: props.itemInfo.Item_ID,
                status: props.itemInfo.Status_FK,
                itemName: name,
                category: cat,
                desc: des,
                value: val,
                location: loc,
                date: dat,
                time: tim,
                firstName: fName,
                lastName: lName,
                phone: phoneNum,
                email: emailAdd,
                dob: dob,
                dl: driverLicense,
                userId: props.itemInfo.User_FK
                })
            )
            props.setShow(false);

        }catch (err){
            if (err) {
                console.error(err)
            }
        }

    }

    function Options(i){
        if(i.Status_FK === 'Lost'){
            return(
            <Container>
                <Row>
                    <Form.Label>Location Found</Form.Label>
                    <input value={loc} onChange={(event) => setLocation(event.target.value)} type="text"/>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                                <FormControl type="text"
                                            name="firstName"
                                            value={fName}
                                            onChange={(event) => setFName(event.target.value)}
                                            placeholder="Enter First Name"/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                                <FormControl type="text"
                                             name="lastName"
                                             value={lName}
                                             onChange={(event) => setLName(event.target.value)}
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
                                          onChange={(event) => setEmailAdd(event.target.value)}
                                          placeholder="Email"></Form.Control>

                        </Col>
                        <Col md={5}>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="input" name="phone" onChange={(e) => formatPhoneNumber(e)}
                                              value={phoneNum} placeholder="(###)###-####"/>
                            </Form.Group>
                        </Col>
                    </Row>

                <Row>
                    <Col md={7}>
                        <Form.Label>Driver's License</Form.Label>
                        <Form.Control type="text"
                                      name="driverLicense"
                                      value={driverLicense}
                                      onChange={(event) => setDriverLicense(event.target.value)}
                                      placeholder="Driver's License"></Form.Control>
                    </Col>
                    <Col md={5}>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date"
                                      name="dob"
                                      value={dob}
                                      onChange={(event) => setDOB(event.target.value)}
                        ></Form.Control>
                    </Col>
                </Row>
            </Container>
            )
        }
        else if(i.Status_FK === 'Unclaimed'){
            return(
                <Container>
                    <Row>
                        <Form.Label>Location Found</Form.Label>
                        <input value={loc} onChange={(event) => setLocation(event.target.value)} type="text"/>
                    </Row>

                </Container>
            )
        }
        if(i.Status_FK === 'Claimed'){
            return(
                <Container>
                    <Row>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <FormControl type="text"
                                             name="firstName"
                                             value={fName}
                                             onChange={(event) => setFName(event.target.value)}
                                             placeholder="Enter First Name"/>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <FormControl type="text"
                                             name="lastName"
                                             value={lName}
                                             onChange={(event) => setLName(event.target.value)}
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
                                          onChange={(event) => setEmailAdd(event.target.value)}
                                          placeholder="Email"></Form.Control>

                        </Col>
                        <Col md={5}>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="input" name="phone"
                                              onChange={(e) => formatPhoneNumber(e)}
                                              value={phoneNum}
                                              placeholder="(###)###-####"/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={7}>
                            <Form.Label>Driver's License</Form.Label>
                            <Form.Control type="text"
                                          name="driverLicense"
                                          value={driverLicense}
                                          onChange={(event) => setDriverLicense(event.target.value)}
                                          placeholder="Driver's License"></Form.Control>
                        </Col>
                        <Col md={5}>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date"
                                          name="dob"
                                          value={dob}
                                          onChange={(event) => setDOB(event.target.value)}
                            ></Form.Control>
                        </Col>
                    </Row>
                </Container>
            )
        }
    }
    
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
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Select Date</Form.Label>
                                    <Form.Control type="date"
                                                  name="date"
                                                  onChange={(event) => setDate(event.target.value)}
                                                  value={dat}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control type="time"
                                                  name="time"
                                                  onChange={(e) => setTime(e.target.value)}
                                                  value={tim}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Label>Item Name</Form.Label>
                                <input value={name}
                                       onChange={(event) => setName(event.target.value)}
                                       type="text"/>
                        </Row>
                        <Row>
                            <Form.Label>Item Category</Form.Label><select className="form-select" id="inputGroupSelect04"
                                                  value={cat}
                                                  onChange={(event) => setCat(event.target.value)}
                                                  aria-label="Example select with button addon">
                            <option value="">--Category--</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Currency">Currency</option>
                            <option value="Key">Key</option>
                            <option value="Accessory">Accessory</option>
                            <option value="ID">Identification</option>
                            <option value="Misc">Misc</option>
                        </select>
                        </Row>
                        <Row>
                            <Form.Label>Description</Form.Label>
                            <textarea value={des} onChange={(event) => setDesc(event.target.value)}
                                          rows="4"></textarea>
                        </Row>
                        <Row>
                            <Form.Label>Value</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>$</InputGroup.Text>
                                <FormControl name="value" value={val}
                                             onChange={(event) => setValue(event.target.value)}
                                             aria-label="Amount (to the nearest dollar)"/>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                        </Row>
                        {Options(props.itemInfo)}

                    </Container>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                    <button className="btn btn-success" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )

}

export default EditModal;