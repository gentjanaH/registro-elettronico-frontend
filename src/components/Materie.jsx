import { Card, Col, Row } from "react-bootstrap";

const Materie = () => {
    return (
        <Row className="my-5">
            <Col xs={12} className="text-center">
                <h1 className="mb-4 text-light"><span className="lettera-logo">Materie </span>insegnate</h1>
                <p className="lead text-black">
                    Esplora le materie che compongono il nostro curriculum scolastico, progettate per offrire una formazione completa e stimolante.
                </p>
            </Col>
            <Col xs={12} >
                {/* In seguito le materie andranno aggiunte dinamicamente tramite API */}
                <h3 className="mt-5 text-light">Materie di Base</h3>

            </Col>

            <Row className="g-3">
                {[
                    "Italiano", "Matematica", "Storia", "Geografia", "Scienze",
                    "Inglese", "Seconda Lingua", "Tecnologia", "Arte e Immagine",
                    "Musica", "Educazione Fisica", "Educazione Civica"
                ].map((materia, i) => (
                    <Col xs={12} md={6} lg={4} key={i}>
                        <Card className="h-100">
                            <Card.Body>
                                <Card.Title>{materia}</Card.Title>
                                <Card.Text>Descrizione sintetica della materia.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Row>
    );
};
export default Materie;