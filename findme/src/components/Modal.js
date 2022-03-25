import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Modal(props){
    if(!props.show){
        return null;
    }
    if(props.active == "H"){
        return(
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            This is a title
                        </h4>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row>
                                Item Name:<input type="text" />
                            </Row>
                            <Row>
                                Item Category:<select className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                                <option value="electronic">Electronic</option>
                                <option value="clothing">Clothing</option>
                                <option value="accessory">accessory</option>
                                <option value="id">Identification</option>
                                <option value="misc">Misc</option>
                            </select>
                            </Row>
                            <Row>
                                Description:
                                <input type="typearea" />
                            </Row>

                            <Row>
                                Location:
                                <select>

                                </select>
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button>Add</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )

    }

}
export default Modal;