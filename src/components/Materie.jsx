import { Card, Col, Row } from "react-bootstrap";

const Materie = () => {
    return (
        <div className="container my-5">
            <h1 className="mb-4">Materie Insegnate</h1>
            <p className="lead">
                Esplora le materie che compongono il nostro curriculum scolastico, progettate per offrire una formazione completa e stimolante.
            </p>

            {/* In seguito le materie andranno aggiunte dinamicamente tramite API */}
            <h3 className="mt-5">Materie di Base</h3>
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
        </div>
    );
};
export default Materie;