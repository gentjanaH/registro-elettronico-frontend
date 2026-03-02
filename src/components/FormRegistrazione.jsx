import { Container, Form, Row, Col, Button } from "react-bootstrap";
import RegistrazioneGenitore from "./RegistrazioneGenitore";
import { useState } from "react";

const FormRegistrazione = () => {

    // stato che monitora il ruolo selezionato
    const [ruolo, setRuolo] = useState("");
    // se il ruolo è genitore mostra campi per:
    // - inserire il codice didentificativo del figlio
    // -aggiungere più figli
    return (
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Form>
                        <fieldset>
                            <Form.Group as={Row} className="my-3">
                                <Form.Label as="legend" sm={2}>
                                    Ruolo
                                </Form.Label>
                                <Col sm={10} className="d-flex justify-content-around align-items-center">
                                    <Form.Check
                                        type="radio"
                                        label="Studente"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        value="STUDENTE"
                                        onChange={(e) => {
                                            setRuolo(e.target.value);
                                        }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Insegnante"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        value="INSEGNANTE"
                                        onChange={(e) => {
                                            setRuolo(e.target.value);
                                        }}
                                    />
                                    <Form.Check
                                        type="radio"
                                        label="Genitore"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                        value="GENITORE"
                                        onChange={(e) => {
                                            setRuolo(e.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                        </fieldset>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Mario" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder="Rossi" />
                        </Form.Group>
                        <Form.Group controlId="dataNascita">
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and numbers,
                            and must not contain spaces, special characters, or emoji.
                        </Form.Text>

                        {/* CAMPI PER IL GENITORE a cui andra passato lo stato del select*/}
                        <RegistrazioneGenitore ruolo={ruolo} />


                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Form.Check label="Remember me" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Sign in</Button>
                            </Col>
                        </Form.Group>
                    </Form>


                </Col>

            </Row>

        </Container>

    );
}

export default FormRegistrazione;