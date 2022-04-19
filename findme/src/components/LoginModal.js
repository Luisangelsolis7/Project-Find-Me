import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginModal(props) {

    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);
    const handleSubmit = async() => {
        setIsPending(true);
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(() => {
                navigate('/Home');
            })
            setIsPending(false);
        }catch (e){
            return e;

        }
    }


    if(!props.show){
        return null;
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">
                        Admin Log-in
                    </h4>
                </div>
                <div className="modal-body">
                    <Container>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Container>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={handleSubmit}>Log In</button>

                    <button className="btn btn-success" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
export default LoginModal;