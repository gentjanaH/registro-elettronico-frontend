import { Container, Row, Col, Card } from "react-bootstrap";

const OffertaFormativa = () => {
    return (
        <Container className="my-5">
            <h1 className="mb-4">Offerta Formativa</h1>
            <p className="lead">
                Un percorso educativo completo, inclusivo e orientato alla crescita personale e culturale degli studenti.
            </p>

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

            <h3 className="mt-5">Laboratori e Attività Extra</h3>
            <ul>
                <li>Laboratorio di Coding e Robotica</li>
                <li>Teatro e Espressione Creativa</li>
                <li>Giornalino Scolastico</li>
                <li>Laboratorio Musicale</li>
                <li>Sport e Benessere</li>
            </ul>

            <h3 className="mt-5">Progetti Speciali</h3>
            <ul>
                <li>Progetto Ambiente</li>
                <li>Progetto Legalità</li>
                <li>Progetto Lettura</li>
                <li>Progetto STEM</li>
                <li>Progetto Inclusione</li>
            </ul>
        </Container>
    );
};

export default OffertaFormativa;
