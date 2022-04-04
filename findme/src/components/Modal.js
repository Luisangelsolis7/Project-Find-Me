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
    const [category, setCat] = useState("");
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const [description, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isPending, setIsPending] = useState(false);
    if (!props.show) {
        return null;
    }
    if (props.active == "H") {
        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            setIsPending(true);
            const entry = {name,category,description,value,location,date,time};
            fetch("http://localhost:8000/Inventory", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(entry)
            }).then(() => {
                setIsPending(false);
                navigate('/Home'); // adding go back 1 page-
            });
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
                                                      value={category}
                                                      onChange={(event => setCat(event.target.value))}
                                                      aria-label="Example select with button addon">
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
                                <input value={description} onChange={(event => setDesc(event.target.value))}
                                       type="textarea"/>
                            </Row>
                            <Row>
                                <Form.Label>Value</Form.Label>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl name="value" value={value}
                                                 onChange={(event => setValue(event.target.value))}
                                                 aria-label="Amount (to the nearest dollar)"/>
                                    <InputGroup.Text>.00</InputGroup.Text>
                                </InputGroup>
                            </Row>
                            <Row>
                                Location Found:
                                <input value={location} onChange={(event => setLocation(event.target.value))}
                                       type="text"/>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control type="date" name="date"
                                                      onChange={event => setDate(event.target.value)} value={date}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Time Lost</Form.Label>
                                        <Form.Control type="time" name="time"
                                                      onChange={(e) => setTime(e.target.value)}
                                                      value={time}></Form.Control>
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
    if (props.active == "L") {
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

}

export default Modal;