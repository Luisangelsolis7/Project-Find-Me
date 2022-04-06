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

const Home = function () {


    const [showAdd, setAddShow] = useState(false);
    const [showClaim, setClaimShow] = useState(false);
    const {data: items, isPending, error} = useFetch('http://localhost:3001/api/getUnclaimed');
    return (
        <>
            <AdminNavBar active="H"/>
            <Container>
                <Row>
                    <Col></Col>
                    <Col md={11}>
                        <br/>
                        <div className="input-group">
                            <select className="form-select" defaultValue="claim" id="inputGroupSelect04"
                                    aria-label="Example select with button addon">
                                <option value="claim">Claim</option>
                                <option value="donate">Donate</option>
                                <option value="destroy">Destroy</option>
                            </select>
                            <button className="openClaimedForm" onClick={() => setClaimShow(true)}>Apply to ALL</button>
                            <Modal onClose={() => setClaimShow(false)} show={showClaim} active="Claim"/>
                        </div>
                        <br/>
                        {error && <div> {error}</div>}
                        {isPending && <div> Loading ... </div>}
                        {items && <ItemList items={items} active="H"/>}
                    </Col>
                    <Col>

                        <br/>
                        <Button className="openAddUnclaimed" onClick={() => setAddShow(true)}>Add Item</Button>
                        <Modal onClose={() => setAddShow(false)} show={showAdd} active="Add"/>

                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Home;