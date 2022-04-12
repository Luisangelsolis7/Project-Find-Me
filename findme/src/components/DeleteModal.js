import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import useFetch from "../useFetch";


function DeleteModal(props) {
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    function formatPhoneNumber(value) {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    }
    function getCurrentDate(separator = '-') {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }
    function getCurrentTime() {
        let newDate = new Date();
        return newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

    }

    if (!props.show) {
        return null;
    }
    {
        const handleSubmit = (e) => {
            e.preventDefault(); // prevent page from auto refresh
            setIsPending(true);
            fetch("http://localhost:3001/api/delete", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    itemId: props.itemInfo.Item_ID,
                    status: props.itemInfo.Status_FK

                })
            }).then(() => {
                setIsPending(false);
                navigate('/Home'); // adding go back 1 page-
            })
        }

        console.log(props.itemInfo);
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Release an Item
                        </h4>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row>
                                Are you Sure you want to Delete this entry?
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSubmit}>Delete</button>
                        <button onClick={props.onClose}>Close</button>
                    </div>
                </div>
            </div>
        )
    }



}

export default DeleteModal;