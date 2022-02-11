import Navbar from 'react-bootstrap/Navbar';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav"
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";
function AdminNavBar(){
    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Home">Admin Page</Nav.Link>
                        <Nav.Link href="/Claimed">Claimed</Nav.Link>
                        <Nav.Link href="/Reports">Reports</Nav.Link>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <Button variant="primary" type="submit">
                                search
                            </Button>
                        </InputGroup>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default AdminNavBar;