import { Container, Row, Col, Card } from "react-bootstrap";

const Contatti = () => {
    return (
        <Container fluid className="container my-5">
            <Row className="mb-4 mx-auto">

                <Col xs={12} className="text-center">
                    <h1 className="mb-4 titolo-carosello fs-1">Contatti</h1>

                    <p className="lead">Per qualsiasi domanda o supporto, non esitare a contattarci:</p>
                </Col>
                <Col xs={12} className="mb-4 d-flex justify-content-center">
                    <Row>
                        <Col xs={12} md={6} className="my-4">

                            <Card className="h-100 w-100">
                                <Card.Body>
                                    <h3 className="mb-4 titolo-carosello fs-4">Segreteria</h3>


                                    <ul className="list-unstyled">
                                        <li>Email: <a href="mailto:info@scuola.it" className="text-light">info@scuola.it</a></li>

                                        <li>Telefono: <a href="tel:+391234567890" className="text-light">+39 123 456 7890</a></li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} className="my-4">
                            <Card className="h-100 w-100">
                                <Card.Body>
                                    <h3 className="mb-4 titolo-carosello fs-4">Supporto Tecnico per il RE</h3>
                                    <ul className="list-unstyled">
                                        <li>Email: <a href="mailto:info@classboard.it" className="text-light">supporto@classboard.it</a></li>

                                        <li>Telefono: <a href="tel:+391234567890" className="text-light">+39 123 456 7890</a></li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} className="mb-4 d-flex justify-content-center">
                    <Row>
                        <Col xs={12} md={6} className="my-4">
                            <Card className="h-100 w-100">
                                <Card.Body>
                                    <h3 className="mb-4 titolo-carosello fs-4">Dirigente scolastico</h3>
                                    <ul className="list-unstyled">
                                        <li>Email: <a href="mailto:info@scuola.it " className="text-light">info@scuola.it</a></li>
                                        <li>Telefono: <a href="tel:+391234567890" className="text-light">+39 123 456 7890</a></li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={6} className="my-4">
                            <Card className="h-100 w-100">
                                <Card.Body>
                                    <h3 className="mb-4 titolo-carosello fs-4">Dove siamo</h3>
                                    <ul className="list-unstyled">
                                        <li>Indirizzo: Via Roma 1</li>
                                        <li>Cap: 00100</li>
                                        <li>Città: Roma</li>
                                        <li>Provincia: RM</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Contatti;