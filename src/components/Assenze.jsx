import { useState } from "react";
import { ListGroup, Row, Col, Button, Card } from "react-bootstrap";
import ModaleGiustificaAssenze from "./ModaleGiustificaAssenze";

const Assenze = () => {

    // stato per aprire il modale utile a giustificare le assenze
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <Row className="d-flex ">
            <Col xs={12} className="d-flex flex-column align-content-center">
                <h1 className="lettera-logo fs-1 fw-bold  my-5">
                    Assenze Studente
                </h1>
                <Row>
                    <Col xs={12} md={6}>

                        <Card border="info" className="my-3">
                            <ListGroup variant="flush" >
                                <ListGroup.Item>Data: 12/10/2026</ListGroup.Item>
                                <ListGroup.Item>Stato: GIUSTIFICATO/DA GIUSTIFICARE</ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        variant="success"
                                        className="ms-3"
                                        onClick={handleShow}
                                    >
                                        Giustifica
                                    </Button></ListGroup.Item>
                            </ListGroup>
                        </Card>
                        {/* MODALE */}
                        <ModaleGiustificaAssenze show={show} handleClose={handleClose} />

                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Data: 12/10/2026</ListGroup.Item>
                                <ListGroup.Item>Stato: GIUSTIFICATO/DA GIUSTIFICARE</ListGroup.Item>
                                <ListGroup.Item> <Button variant="success" className="ms-3">
                                    Giustifica
                                </Button></ListGroup.Item>
                            </ListGroup>
                        </Card>

                    </Col>

                </Row>
            </Col>


        </Row>
    );
}
export default Assenze;