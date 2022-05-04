import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, {useState, useEffect} from "react";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

function Register(props) {

    const axiosPrivate = useAxiosPrivate();
    const[errMsg, setErrMSg] = useState('');
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[matchPassword, setMatchPassword] = useState("");
    const[badge, setBadge] = useState("");
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = axiosPrivate.post('/api/register', JSON.stringify({
                    email: email,
                    badge: badge,
                    password: password
                })
            )
            props.setShow(false);
            alert("New Admin Added")

        }catch (err){
            if (err) {
                console.error(err)
            }
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
                        Register
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
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="matchPassword">Re-type Password</Form.Label>
                                <Form.Control id="matchPassword" type="password"  value={matchPassword} required onChange={(e) => setMatchPassword(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="badge">Badge</Form.Label>
                                <Form.Control id="badge" type="text"  value={badge} required onChange={(e) => setBadge(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Container>
                </div>
                <p className={errMsg}>{errMsg}</p>
                <div className="modal-footer">
                    <button className="btn btn-success" disabled={password !== matchPassword || password == ''} onClick={handleSubmit}>Submit</button>

                    <button className="btn btn-success" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}
export default Register;