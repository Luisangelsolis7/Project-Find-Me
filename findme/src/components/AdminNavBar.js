import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl, NavItem} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React from 'react';
function AdminNavBar(props){
    let Home, Claimed, Reports = "nav-link";
    if(props.active == "H"){
        Home = "nav-link active";
        Claimed = "nav-link";
        Reports = "nav-link";
    }if(props.active == "C"){
        Home = "nav-link";
        Claimed = "nav-link active";
        Reports = "nav-link";
    }if(props.active == "R"){
        Home = "nav-link";
        Claimed = "nav-link";
        Reports = "nav-link active";
    }
    return(
        <Navbar bg="light" expand="lg" className="justify-content-end">
            <Container>
                <Navbar.Brand href="/"><img src={require("../imgs/logo.svg")}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavItem><Nav.Link className={Home} href="/Home">Unclaimed Items</Nav.Link></NavItem>
                        <NavItem><Nav.Link className={Claimed} href="/Claimed">Claimed Items</Nav.Link></NavItem>
                        <NavItem><Nav.Link className={Reports} href="/Reports">Reports</Nav.Link></NavItem>
                        <NavItem>
                            <InputGroup >
                                <FormControl
                                    placeholder="Search"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="primary" type="submit">
                                    search
                                </Button>
                            </InputGroup>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default AdminNavBar;