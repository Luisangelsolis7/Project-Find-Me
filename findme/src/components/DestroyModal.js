import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import React from 'react';
import Button from "react-bootstrap/Button";


import useAuth from "../Hooks/useAuth";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";


function DestroyModal(props) {
    const {auth} = useAuth()
    const axiosPrivate = useAxiosPrivate();


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

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        try{
            const response =  axiosPrivate.post('/api/insertDestroyed', JSON.stringify({
                itemId: props.itemInfo,
                date: getCurrentDate(),
                time: getCurrentTime(),
                badge: auth.badge
                })
            )
            props.setShow(false);

        }catch (err){
            if (err) {
                console.error(err)
            }
        }

    }

        if (!props.show) {
            return null;
        }

        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Destroy Item(s)
                        </h4>
                        <Button size="sm" variant="outline-primary" onClick={props.onClose}
                                style={{float: "right", marginLeft: "-50%"}}>X</Button>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row>
                                <h5>Are you sure you want to mark these items as destroyed?</h5>
                            </Row>
                        </Container>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSubmit}>Confirm</button>
                        <button onClick={props.onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        )

}

export default DestroyModal;