import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import {Link,useNavigate, useLocation} from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function LoginModal(props) {

    const{setAuth} = useAuth();
    const[errMsg, setErrMSg] = useState('');
    const navigate = useNavigate();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            if (!response) {
                setErrMSg('No Server Response')
            }else if(response?.status === 200){
                setErrMSg('Login Success!')
                let data = await response.json();
                const accessToken = data?.accessToken;
                setAuth({email, password, accessToken});
                console.log(data);
                navigate('/Home');
            }
            else if(response?.status === 400) {
                setErrMSg('Missing Username or Password')
            } else if (response?.status === 401) {
                setErrMSg('Invalid Login')
            } else {
                setErrMSg(('Login Failed'))

            }

        }catch (err){
            alert(err)

        }

    }

    useEffect(() => {
        setErrMSg('')
    }, [email, password])

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, [props.show])





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
                                <Form.Label htmlFor="email">Email address</Form.Label>
                                <Form.Control id="email" type="text"  value={email}  required onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control id="password" type="password"  value={password} required onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Container>
                </div>
                <p className={errMsg}>{errMsg}</p>
                <div className="modal-footer">
                    <button className="btn btn-success" onClick={handleSubmit}>Log In</button>

                    <button className="btn btn-success" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
export default LoginModal;