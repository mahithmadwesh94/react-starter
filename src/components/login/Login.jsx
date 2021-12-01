import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8800/api/auth/", {
            username: username,
            password: password,
            email: email,
        })
            .then((res) => {

                // localStorage.setItem({
                //     key: "user", value: JSON.stringify(res.data)

                // })
                // history.replace("/user")
                setModalShow(true)
            })
            .catch((err) => console.log(err.Duplicate));
    };
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password)
        axios.post("http://localhost:8800/api/auth/login", {
            username: username,
            password: password,
        })
            .then((res) => {
                console.log(res)
                localStorage.setItem(
                    "user", JSON.stringify(res.data)
                )
                navigate("/user");
                // setModalShow(true)
            })
            .catch((err) => console.log(err.Duplicate));
    };
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Login</h1>
                    <Form onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <h1>Register</h1>
                    <Form onSubmit={handleRegister}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your details with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check
                                type="checkbox"
                                label="I agree to Terms & Conditions"
                                required

                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Register Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, Login with the same!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModalShow(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Login;
