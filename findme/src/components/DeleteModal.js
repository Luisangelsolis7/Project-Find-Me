import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import React from 'react';
import Button from "react-bootstrap/Button";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";


function DeleteModal(props) {
    const axiosPrivate = useAxiosPrivate();

    if (!props.show) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        try{
            const response =  axiosPrivate.post('/api/delete', JSON.stringify({
                itemId: props.itemInfo.Item_ID,
                status: props.itemInfo.Status_FK
                })
            )
            props.setShow(false);

        }catch (err){
            if (err) {
                console.error(err)
            }
        }

    }


        console.log(props.itemInfo);
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            Delete
                        </h4>
                        <Button size="sm" variant="outline-primary" onClick={props.onClose} style={{float:"right", marginLeft: "-50%"}}>X</Button>
                    </div>
                    <div className="modal-body">
                        <Container>
                            <Row>
                                Confirm Delete?
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

export default DeleteModal;