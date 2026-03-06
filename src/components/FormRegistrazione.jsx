import { Container, Form, Row, Col, Button } from "react-bootstrap";
import RegistrazioneGenitore from "./RegistrazioneGenitore";
import { useState } from "react";
import Immaginecomponent from "./ImmagineComponent";

const FormRegistrazione = () => {

    // stato che monitora il ruolo selezionato
    const [ruolo, setRuolo] = useState("");
    // se il ruolo è genitore mostra campi per:
    // - inserire il codice didentificativo del figlio
    // -aggiungere più figli
    return (
        <>
            <Row>
                <Col xs={12} lg={6} className="d-flex justify-content-center align-content-center ">
                    <Form className="w-75 w-md-25 m-auto">
                        <fieldset>
                            <Form.Group as={Row} className="my-3">

                                <Col sm={12} >
                                    <Row className="d-flex justify-content-between align-items-center w-100">
                                        <Col xs={12} className="d-flex justify-content-center">
                                            <Form.Label as="legend" className="text-center mb-3 titolo-carosello" sm={2}>
                                                Ruolo
                                            </Form.Label>
                                        </Col>
                                        <Col xs={12} className="d-flex justify-content-around">
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
                                    </Row>
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

                        <Row>
                            <Col xs={12} lg={5} className="my-3 d-flex justify-content-start">
                                <Form.Group controlId="formHorizontalCheck">

                                    <Form.Check label="Remember me" className="my-3 ms-2" />

                                </Form.Group>
                            </Col>
                            <Col xs={12} lg={7} className="my-3 d-flex justify-content-lg-end">
                                <Form.Group controlId="formHorizontalSubmit">

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="add-child-button"
                                    >
                                        Sign in
                                    </Button>

                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>


                </Col>

                <Immaginecomponent />

            </Row>

        </>

    );
}

export default FormRegistrazione;