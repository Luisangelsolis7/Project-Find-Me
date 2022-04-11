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


function EditModal(props) {
    const navigate = useNavigate;
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [emailAdd, setEmailAdd] = useState("");
    const [name, setName] = useState(props.itemInfo.Item_Name);
    const [cat, setCat] = useState(props.itemInfo.Category_Name);
    const [val, setValue] = useState(props.itemInfo.Item_Value);
    const [des, setDesc] = useState(props.itemInfo.Item_Desc);
    const [loc, setLocation] = useState(props.itemInfo.ISH_Location);
    const [dat, setDate] = useState(props.itemInfo.ISH_Date);
    const [tim, setTime] = useState(props.itemInfo.ISH_Time);
    const [dob, setDOB] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    const [phoneNum, setPhoneNum] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [item, setItem] = useState(props.itemInfo);

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
    useEffect(() => {
        setName(props.itemInfo.Item_Name);
        setCat(props.itemInfo.Category_Name);
        setValue(props.itemInfo.Item_Value);
        console.log(cat);
    },[props.show]);
    if (!props.show) {
        return null;
    }
    console.log(name);
    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        setIsPending(true);
        fetch("http://localhost:3001/api/edit", {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                itemId: props.itemid,
                status: 'Unclaimed',
                itemName: name,
                category: cat,
                desc: des,
                value: val,
                location: loc,
                date: dat,
                time: tim
            })
        }).then(() => {
            setIsPending(false);
            navigate('/Home'); // adding go back 1 page-
        })
    }
    // const {data: itemInfo, isPending, error} = useFetch('http://localhost:3001/api/getUnclaimed');
    // Category_Name: "Accessory"
    // ISH_Date: "2022-04-03T05:00:00.000Z"
    // ISH_Location: "Parking Garage"
    // ISH_Time: "18:59:00"
    // Item_Desc: " "
    // Item_ID: 128
    // Item_Name: "Silver Bracelet"
    // Item_Value: 50
    // Officer_Badge: 999
    // Officer_Fname: "Test"
    // Officer_Lname: "Officer"
    // Status_FK: "Unclaimed"
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
                            Item Name:<input value={name} onChange={(event => setName(event.target.value))}
                                             type="text"/>
                        </Row>
                        <Row>
                            Item Category:<select className="form-select" id="inputGroupSelect04"
                                                  value={cat}
                                                  onChange={(event => setCat(event.target.value))}
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
                    <button className="btn btn-success" onClick={handleSubmit}>Save</button>
                    <button className="btn btn-success" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )

}

export default EditModal;