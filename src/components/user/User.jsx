
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";


const User = () => {
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [dob, setDob] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    //fetch user from localStorage
    useEffect(() => {
        const getUser = () => {
            if (localStorage.getItem("user")) {
                setUser(JSON.parse(localStorage.getItem("user")))
                let tempUser = JSON.parse(localStorage.getItem("user"))
                setUsername(tempUser.username);
                setEmail(tempUser.email);
                setContact(tempUser.contact);
                setDob(tempUser.dob)
            } else {
                navigate("/")
            }
        }
        getUser()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8800/api/auth/user/${user._id}`, {
            id: user._id,
            username: username,
            password: password,
            dob: dob,
            contact: contact,
            email: email
        }).then(res => {
            console.log(res.data)
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(res.data))
            setUser(res.data)
        }).catch(err => console.log(err))
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        navigate('/');

    }
    return (
        <Container>
            <Form >
                <Row>

                    <h1>Update Details</h1>
                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" value={username} placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                        </Form.Group>
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" placeholder="Enter Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col lg={6} md={6} sm={12}>

                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                    </Col>
                </Row>
                <Button type="submit" variant="primary me-3" onClick={handleSubmit}>Update</Button>
                <Button variant="danger" onClick={handleLogout}>Log out</Button>
            </Form>
        </Container>
    )
}

export default User
