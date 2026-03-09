import { Card, Col, Row, ListGroup } from "react-bootstrap";

const HomePageStudentiGenitori = () => {
    return (
        <Row className="text-center mt-5">
            <Col xs={12} className="d-flex align-items-start ms-5">
                <h3 className="lettera-logo mb-4 fw-bold fs-2">
                    {new Date().toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}
                </h3>
            </Col>

            <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start ms-0 ms-md-5 ">
                <h3 className="lettera-logo mb-4 fw-bold fs-2">
                    COMPITI
                </h3>
                <Card className="mb-2">
                    <Card.Body>
                        <Card.Title>Materia</Card.Title>
                        <Card.Text>
                            Descrizione del compito assegnato.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-2">
                    <Card.Body>
                        <Card.Title>Materia</Card.Title>
                        <Card.Text>
                            Descrizione del compito assegnato.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-2">
                    <Card.Body>
                        <Card.Title>Materia</Card.Title>
                        <Card.Text>
                            Descrizione del compito assegnato.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-2">
                    <Card.Body>
                        <Card.Title>Materia</Card.Title>
                        <Card.Text>
                            Descrizione del compito assegnato.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-2">
                    <Card.Body>
                        <Card.Title>Materia</Card.Title>
                        <Card.Text>
                            Descrizione del compito assegnato.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Row className="mt-5">
                    <Col xs={12} md={6}>
                        <h1>
                            Spinner media valutazioni
                        </h1>

                    </Col>

                    <Col xs={12} md={6}>
                        <h1>
                            Spinner media presenze
                        </h1>

                    </Col>


                    <Col xs={12} className="mt-5">
                        <Row>


                            <h3>Attivita extra-curricolari</h3>
                            <h4>Previste per oggi:</h4>
                            <Col xs={12} className="d-flex flex-column align-items-center mt-3 g-4">
                                <ListGroup horizontal className="mb-3">
                                    <ListGroup.Item>Nome corso</ListGroup.Item>
                                    <ListGroup.Item>Inizio</ListGroup.Item>
                                    <ListGroup.Item>Fine</ListGroup.Item>
                                    <ListGroup.Item>classe</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal>
                                    <ListGroup.Item>Nome corso</ListGroup.Item>
                                    <ListGroup.Item>Inizio</ListGroup.Item>
                                    <ListGroup.Item>Fine</ListGroup.Item>
                                    <ListGroup.Item>classe</ListGroup.Item>
                                </ListGroup>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            </Col>
        </Row>
    );
}
export default HomePageStudentiGenitori;