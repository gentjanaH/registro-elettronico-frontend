import { Col, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CaroselloFunzionalita = () => {
    return (
        <>
            <Col xs={12} className="mb-5 mt-0">
                <h5 className="titolo-carosello">Scopri cosa puoi fare!</h5>
            </Col>

            <Row className="px-3 g-4 justify-content-center">
                <Col xs={12} md={5}>
                    <Card className="h-100 card-cliccabili">
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title>Corsi extra-curricolari</Card.Title>
                            <Card.Text>
                                In quest'area è possibile visualizzare i corsi extra-curricolari
                                in corso o in programma offerti dalla scuola.
                            </Card.Text>
                            <div>
                                <Button className="bg-info border-white">
                                    <Link
                                        className="card-link text-decoration-none"
                                        to="/corsi-extra"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Vai alla pagina
                                    </Link>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={5}>
                    <Card className="h-100 card-cliccabili">
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title>Materie</Card.Title>
                            <Card.Text>
                                In quest'area è possibile visualizzare le materie
                                insegnate dalla scuola.
                            </Card.Text>
                            <div>
                                <Button className="bg-info border-white">
                                    <Link
                                        className="card-link text-decoration-none"
                                        to="/materie"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Vai alla pagina
                                    </Link>
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CaroselloFunzionalita;