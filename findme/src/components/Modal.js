import React, {useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";

function Modal(props) {
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [category, setCat] = useState("");
    const [description, setDesc] = useState("");
    const [value, setValue] = useState("");
    const [location, setLocation] = useState("");
    const [time, setTime] = useState("");
    const [isPending, setIsPending] = useState(false);
    const handleSubmitHome = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        setIsPending(true);
        const entry = {date,name,category,description,value,location,time};
        console.log(entry);
        fetch("http://localhost:3001/api/insertUnclaimed", {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(entry)
        }).then(() => {
            setIsPending(false);
            //history.go(-1); // adding go back 1 page-
            //history.push('/'); // adding go back 1 page-
            navigate('/Home'); // adding go back 1 page-
        });
    }
    if (!props.show) {
        return null;
    }
    if (props.active == "H") {
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
                                Item Name:<input type="text"/>
                            </Row>
                            <Row>
                                Item Category:<select className="form-select" id="inputGroupSelect04"
                                                      aria-label="Example select with button addon">
                                <option value="electronic">Electronic</option>
                                <option value="clothing">Clothing</option>
                                <option value="accessory">Accessory</option>
                                <option value="id">Identification</option>
                                <option value="misc">Misc</option>
                            </select>
                            </Row>
                            <Row>
                                Description:
                                <input type="textarea"/>
                            </Row>

                            <Row>
                                Location Found:
                                <select>

                                </select>
                            </Row>
                            <Row>
                                Date Found:
                                <input type="Date"/>
                                    Time Found:
                                <input type="Time"/>
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSubmitHome}>Add</button>
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