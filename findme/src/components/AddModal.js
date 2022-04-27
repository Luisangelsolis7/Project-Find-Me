import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import axios, {axiosPrivate} from "../api/axios";
import useAuth from "../Hooks/useAuth";

function AddModal(props) {
    const {auth} = useAuth()
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cat, setCat] = useState("");
    const [val, setValue] = useState("");
    const [des, setDesc] = useState("");
    const [loc, setLocation] = useState("");
    const [dat, setDate] = useState("");
    const [tim, setTime] = useState("");
    const [isPending, setIsPending] = useState(false);


        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            setIsPending(true);
            fetch("http://localhost:3001/api/insertUnclaimed", {
                credentials: "include",
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    itemName: name,
                    category: cat,
                    desc: des,
                    value: val,
                    location: loc,
                    date: dat,
                    time: tim,
                    badge: auth.badge
                })
            });
            props.setShow(false);
            setIsPending(false);
            //navigate(0);
        }

        useEffect(() => {
            setName('');
            setDesc('');
            setTime('');
            setCat('');
            setLocation('');
            setValue('');
        },[props.show])
        if(!props.show){
            return null;
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
                                <option value="key">Key</option>
                                <option value="currency">Currency</option>
                                <option value="accessory">Accessory</option>
                                <option value="id">Identification</option>
                                <option value="misc">Misc</option>
                            </select>
                            </Row>
                            <Row>
                                Description:
                                <textarea value={des} onChange={(event => setDesc(event.target.value))}
                                          rows="4"></textarea>
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

export default AddModal;