import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";



const FormLogin = () => {

    // stati per email e password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} md={6}>
                    <h1>Immagine</h1>
                </Col>
            </Row>
        </Container>



    );

}

export default FormLogin;