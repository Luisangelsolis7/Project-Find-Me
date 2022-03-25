import React from 'react';
import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "../components/Modal";
import useFetch from "../useFetch";
import {useState} from "react";
const Home = function(){

const[show,setShow] = useState(false);
    const {data : items, isPending, error } = useFetch('http://localhost:3001/api/getUnclaimed');
    return(
        <>
            <AdminNavBar active="H"/>
            <Container>
                <Row >
                    <Col>Savanna is super cool</Col>
                    <Col md={10}>
                        { error  && <div> {error}</div>}
                        { isPending && <div> Loading ... </div> }
                        { items && <ItemList items={items} active="H"/>}
            <div className="input-group">
                <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                    <option value="destroy" defaultValue="destroy">Destroy</option>
                    <option value="claim">Claim</option>
                    <option value="edit">Edit</option>
                    <option value="donate">Donate</option>
                </select>
                <button className="btn btn-outline-secondary" type="button">Apply to ALL</button>
            </div>
                    </Col>
                    <Col>
                        <br />
                        <Button onClick={() => setShow(true)}>Add Item</Button>
                        <Modal onClose={() => setShow(false)} show={show} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Home;