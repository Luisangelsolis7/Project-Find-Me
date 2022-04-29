import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import {Link,useNavigate, useLocation} from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import axios from "../api/axios";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const{setAuth} = useAuth();
    const[errMsg, setErrMSg] = useState('');
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('/login', JSON.stringify({email: email, password: password}), {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            const accessToken = response?.data?.accessToken;
            const badge = response?.data?.badge;
            setAuth({email, password, badge, accessToken});
            setEmail('');
            setPassword('');
            navigate(from, {replace: true});
        }catch (err){
            if (!err?.response){
                setErrMSg('No Server Response')
            }else if(err?.response.status === 400){
                setErrMSg('Missing Username or Password')
            }else if(err?.response.status === 401){
                setErrMSg('Invalid Login')
            }else{
                setErrMSg('Login Failed')
            }

        }
    }

    useEffect(() => {
        setErrMSg('')
    }, [email, password])



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
                </div>
            </div>
        </div>
    )
}
export default Login;