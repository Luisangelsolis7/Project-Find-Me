import React from 'react';
import NavBar from "../components/NavBar";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Popover} from "react-bootstrap";
import {OverlayTrigger} from "react-bootstrap";
import {useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {Dropdown} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";


    const ReportForm = () => {
        let category = "Category ";

        function changeCat(cat) {
            category = cat;
        }


        return (


            <div style={{ backgroundImage: "url(/logo.svg" }}>
                <NavBar />
                <Navbar.Brand href="/"><img class="resize" src={require("../imgs/AULogo.jpg")}/></Navbar.Brand>
                <body>
                <header> Lost Item Form</header>
                <Container>
                    <form>

                    <Row>
                        <Col xs lg="2"></Col>

                        <Col>
                            <Row>
                                <Col>
                                    <row>
                                        <br/>
                                        <p>
                                Item Name: <input type="text" />
                                        </p>
                                        </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                Category: <td><select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                                        <option value="electronic">Electronic</option>
                                        <option value="clothing">Clothing</option>
                                        <option value="accessory">accessory</option>
                                        <option value="id">Identification</option>
                                        <option value="misc">Misc</option>
                                    </select></td>
                                        </p>
                                    </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                    Item Description: <input type="text" />
                                        </p>
                                    </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                    Item Value: <input type="text" />
                                        </p>
                                    </row>
                                    <br/>
                                    <row>
                                        <br/>
                                    <p>
                                    First Name: <input type="text" />
                                    </p>
                                        </row>
                                    <br/>
                                <row>
                                    <br/>
                                    <p>
                                    Last Name: <input type="text" />
                                    </p>
                                </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                        Date of Birth: <input type="date" />
                                        </p>
                                    </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                        Phone Number: <input type="number" />
                                        </p>
                                    </row>
                                    <br/>
                                <row>
                                    <br/>
                                    <p>
                                    Email: <input type="text" />
                                    </p>
                                </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                        Date: <input type="date" />
                                        </p>
                                    </row>
                                    <br/>
                                    <row>
                                        <br/>
                                        <p>
                                        Time: <input type="time" />
                                        </p>
                                        <br/>
                                    </row>
                                <br/>
                                </Col>

                                <br/>
                                <p>
                                <td>Location:<select>
                                    <option value="electronic">Alumni Hall</option>
                                    <option value="clothing">Bookstore</option>
                                    <option value="accessory">Business Office</option>
                                    <option value="id">Campus Public Safety</option>
                                    <option value="misc">Business Office</option>
                                    <option value="electronic">Centennial Hall</option>
                                    <option value="clothing">Parking Garage</option>
                                    <option value="accessory">Dunham Hall</option>
                                    <option value="id">Institute for Collaboration</option>
                                    <option value="misc">Business Office</option>
                                    <option value="electronic">The Community Foundation of the
                                        Fox River Valley Center for Cultural
                                        Enrichment and Perry Theatre</option>
                                    <option value="clothing">Copy Center</option>
                                    <option value="accessory">Dunham Hall</option>
                                    <option value="id">Davis Hall</option>
                                    <option value="misc">Dining Hall</option>
                                    <option value="electronic">Dunham Hall</option>
                                    <option value="clothing">Eckhart Hall</option>
                                    <option value="accessory">Fitness Center</option>
                                    <option value="id">Founders Annex</option>
                                    <option value="misc">Founders House</option>
                                    <option value="electronic">Hill Welcome Center and
                                        Ethel Tapper Recital Hall</option>
                                    <option value="clothing">Human Resources</option>
                                    <option value="accessory">Institute for Collaboration</option>
                                    <option value="id">Crimi Auditorium</option>
                                    <option value="misc">Jenks Hall</option>
                                    <option value="clothing">John C. Dunham
                                        STEM Partnership School
                                        Kimberly and James Hill Center
                                        for Student Success</option>
                                    <option value="accessory">Labyrinth</option>
                                    <option value="id">Mail Center</option>
                                    <option value="misc">Memorial Hall</option>
                                    <option value="electronic">Michael J. Birck Collaboration
                                        Center for Innovation</option>
                                    <option value="clothing">Office of Admission and
                                        Financial Aid</option>
                                    <option value="accessory">Phillips Library</option>
                                    <option value="id">Quad</option>
                                    <option value="misc">Roger and Marilyn Parolini
                                        Music Center</option> <option value="clothing">Parking Garage</option>
                                    <option value="accessory">Schingoethe Center</option>
                                    <option value="id">Spartan Spot</option>
                                    <option value="misc">Spartan Statue/
                                        Bedrosian Plaza</option>
                                    <option value="electronic">Spartan Terrace</option>
                                    <option value="clothing">Stephens Hall</option>
                                    <option value="accessory">Thornton Gymnasium</option>
                                    <option value="id">Tru Blu Coffee</option>
                                    <option value="misc">University Banquet Hall</option>
                                    <option value="id">University Communications</option>
                                    <option value="misc">Vago Field</option> <option value="clothing">Parking Garage</option>
                                    <option value="accessory">Wackerlin Center for
                                        Faith and Action</option>
                                    <option value="id">Watkins Hall</option>
                                    <option value="misc">Wellness Center
                                        (Health Services/Counseling
                                        and Psychological Services)</option>
                                    <option value="electronic">Wilkinson Hall</option>
                                    <option value="misc"></option>

                                </select></td>
                                </p>
                            </Row>
                        </Col>

                        <Col xs lg="2"></Col>

                    </Row>
                        <button onClick="http://localhost:3000/" type="button">Submit</button>
                        <br/>
                        <br/>
                    </form>
                    <br/>
                    <br/>
                    <br/>
                </Container>

                </body>
            </div>


        )

    };
    export default ReportForm;