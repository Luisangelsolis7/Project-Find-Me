import React from 'react';
import {Navbar, Button, Container, Nav} from "react-bootstrap";
import "../CSS/NavBar_Custom_Styles.css";
import AU_Logo from "../imgs/AU_Logo_Transparent_WhiteText.png";

function NavBar() {

    return (
        <>
            <Navbar className={"bg-au-blue"} expand={"lg"}>
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={AU_Logo}
                            width="120px"
                            className="d-inline-block align-top"
                            alt="AU_Logo"
                        />
                    </Navbar.Brand>
                    <Nav>
                        <Button className="btn btn-success" href="/Admin">Admin Login</Button>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;