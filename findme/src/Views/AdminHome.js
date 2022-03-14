import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
const Home = function(){
    return(
        <>
            <AdminNavBar active="H"/>
            <Container>
                <Row >
                    <Col>Savanna is super cool</Col>
                    <Col md={10}>
            <ItemList />
            <div className="input-group">
                <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                    <option selected>Destroy</option>
                    <option value="1">Claim</option>
                    <option value="2">Edit</option>
                    <option value="3">Donate</option>
                </select>
                <button className="btn btn-outline-secondary" type="button">Apply to ALL</button>
            </div>
                    </Col>
                    <Col>
                        Right
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Home;