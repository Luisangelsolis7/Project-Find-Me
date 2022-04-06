import React from 'react';
import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useFetch from "../useFetch";

const Reports = function() {
    const {data : items, isPending, error } = useFetch('http://localhost:3001/api/getLost');
    return (
        <>
            <AdminNavBar active="R"/>
    <Container>
        <Row >
            <Col></Col>
            <Col md={11}>
                <br />
                <div className="input-group">
                    <select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                        <option value="N" selected>Notify</option>
                        <option value="D">Delete</option>
                    </select>
                    <button className="btn btn-outline-secondary" type="button">Apply to ALL</button>
                </div>
                <br />
                { error  && <div> {error}</div>}
                { isPending && <div> Loading ... </div> }
                { items && <ItemList items={items} active="R"/>}

            </Col>
            <Col></Col>
        </Row>
    </Container>
            </>
    )
};
export default Reports;