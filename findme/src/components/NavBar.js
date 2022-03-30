import React, {useState} from 'react';
import Button from "react-bootstrap/Button";
import Modal from "./Modal";
import Navbar from "react-bootstrap/Navbar";
function NavBar(){
    const[show,setShow] = useState(false);
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Navbar.Brand className="justify-content-center"><img className="resize" src={require("../imgs/AULogo.jpg")}/></Navbar.Brand>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Button className="btn btn-success" onClick={() => setShow(true)}>Log In</Button>
                                <Modal onClose={() => setShow(false)} show={show} active="L" />
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default NavBar;