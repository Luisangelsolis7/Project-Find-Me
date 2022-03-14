import AdminNavBar from "../components/AdminNavBar";
import ItemList from "../components/ItemList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import connection from "../DatabaseConnection";
let mysql = require('mysql');
const Home = function(){
    const[data,setData]=useState()
    //npx json-server --watch data/books.json --port 8000
    useEffect(() => {
        console.log("Page loaded")



        connection.connect(function(err) {
            if (err) throw err;
            console.log('Database is connected successfully !');
        });




        //http://localhost:8000/books
        fetch("http://45.55.136.114/~dlash/CSC2200/LOTR.php").then(resp => {
            console.log("Response:");
            console.log(resp);
            return resp.json();
        }).then (data => {
            setData(data);
        })
    },[])
    console.log(data);
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