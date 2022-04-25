import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl, NavItem} from "react-bootstrap";
function AdminNavBar(props){
    let Home, Claimed, Reports = "nav-link";
    if(props.active === "H"){
        Home = "nav-link active";
        Claimed = "nav-link";
        Reports = "nav-link";
    }if(props.active === "C"){
        Home = "nav-link";
        Claimed = "nav-link active";
        Reports = "nav-link";
    }if(props.active === "R"){
        Home = "nav-link";
        Claimed = "nav-link";
        Reports = "nav-link active";
    }
    return(
        <Navbar bg="light"  variant="light"  expand="lg" className="justify-content-end">
            <Container>

                <Navbar.Brand href="/"><img src={require("../imgs/Aurora_University_logo.jpg")} alt="AU Logo"  width="150px" height="auto" className="aulogo"/>
                </Navbar.Brand>



                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="tabs">
                        <NavItem className="NavItem"><Nav.Link className={Reports} href="reports">Lost Reports</Nav.Link></NavItem>
                        <NavItem className="NavItem"><Nav.Link className={Home} href="admin">Found Items</Nav.Link></NavItem>
                        <NavItem className="NavItem"><Nav.Link className={Claimed} href="claimed">Claimed Items</Nav.Link></NavItem>
                        <InputGroup className="searchBar">
                            <FormControl
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={props.q}
                                onChange={props.onChangeValue}
                            />
                            {/*<Button variant="primary" type="submit">*/}
                            {/*    search*/}
                            {/*</Button>*/}
                        </InputGroup>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default AdminNavBar;