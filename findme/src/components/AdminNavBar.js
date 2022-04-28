import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import InputGroup from "react-bootstrap/InputGroup";
import {Col, FormControl, NavItem} from "react-bootstrap";
import useLogout from "../Hooks/useLogout";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Register from "./Register";
import useAuth from "../Hooks/useAuth";
function AdminNavBar(props){
    const {auth} = useAuth();
    const[show,setShow] = useState(false);
    const logout = useLogout();
    const navigate = useNavigate();
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
    const signOut = async () => {
        await logout();
        navigate("/")
    }
    return(
        <Navbar bg="light"  variant="light"  expand="lg" className="justify-content-end">
            <Container>

                <Navbar.Brand href="/"><img src={require("../imgs/Aurora_University_logo.jpg")} alt="AU Logo"  width="150px" height="auto" className="aulogo"/>
                </Navbar.Brand>



                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav variant="tabs">
                        <NavItem className="NavItem"><Nav.Link className={Reports} onClick={() => props.changeToggle("R")}>Lost Reports</Nav.Link></NavItem>
                        <NavItem className="NavItem"><Nav.Link className={Home} onClick={() => props.changeToggle("H")}>Found Items</Nav.Link></NavItem>
                        <NavItem className="NavItem"><Nav.Link className={Claimed} onClick={() => props.changeToggle("C")}>Claimed Items</Nav.Link></NavItem>
                        <InputGroup className="searchBar">
                            <FormControl
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={props.q}
                                onChange={props.onChangeValue}
                            />
                            <br/>

                            <Col>
                                <Button className="btn btn-primary" onClick={() => setShow(true)}>Register</Button>
                                <Button className="btn btn-primary" onClick={signOut}>Logout</Button><br/>
                                Logged in as Officer: {auth.badge}.
                            </Col>


                        </InputGroup>
                    </Nav>
                </Navbar.Collapse>
                <Register onClose={() => setShow(false)} setShow={setShow} show={show}/>
            </Container>
        </Navbar>
    )
}
export default AdminNavBar;