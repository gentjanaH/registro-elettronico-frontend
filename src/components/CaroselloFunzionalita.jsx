import { Col, Row, Image, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const CaroselloFunzionalita = () => {

    return (
        <>
            <Col xs={12} className="my-3">
                <h5 className="my-3 titolo-carosello">Scopri cosa puoi fare!</h5>
            </Col>
            <Carousel interval={null} touch={false} pause="hover" indicators={false}>

                <Carousel.Item>
                    <Row className="px-4">
                        <Col xs={12} md={4}>
                            <Card className="h-100 card-cliccabili">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>Area Genitori</Card.Title>

                                    <Card.Text>
                                        In quest'area i genitori possono visualizzare i voti, le comunicazioni scolastiche,
                                        e giustificare le assenze dei propri figli.

                                    </Card.Text>
                                    <div>
                                        <Link className="card-link text-decoration-none" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                        <Link className="card-link text-decoration-none" to="/register" onClick={(e) => e.stopPropagation()}>Registrati</Link >
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} md={4}>
                            <Card className=" h-100 card-cliccabili">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>Area Docenti</Card.Title>

                                    <Card.Text>
                                        In quest'area i docenti possono visualizzare le informazioni relative ai loro studenti,
                                        caricare i voti, i compiti e le comunicazioni scolastiche.
                                    </Card.Text>
                                    <div>
                                        <Link className="card-link text-decoration-none" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                        <Link className="card-link text-decoration-none" to="/register" onClick={(e) => e.stopPropagation()}>Registrati</Link >
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="h-100 card-cliccabili">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>Area Studenti</Card.Title>

                                    <Card.Text>
                                        In quest'area i studenti possono visualizzare i loro voti,
                                        i compiti e le comunicazioni scolastiche.
                                    </Card.Text>
                                    <div>
                                        <Link className="card-link text-decoration-none" to="/home/id_studente" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                        <Link className="card-link text-decoration-none" to="/register" onClick={(e) => e.stopPropagation()}>Registrati</Link >
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>



                    </Row>

                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="h-100 card-cliccabili">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>Area Amministratori</Card.Title>

                                    <Card.Text>
                                        In quest'area gli amministratori possono gestire l'intero sistema,
                                        creare e modificare account, e visualizzare statistiche generali.
                                    </Card.Text>
                                    <div>
                                        <Link className="card-link text-decoration-none" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                    </div>
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="h-100 card-cliccabili">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>Corsi extra-curricolari</Card.Title>

                                    <Card.Text>
                                        In quest'area è possibile visualizzare i corsi extra-curricolari in corso o in programma offerti dalla scuola.

                                    </Card.Text>
                                    <div>
                                        <Link className="card-link text-decoration-none" to="/corsi-extra" onClick={(e) => e.stopPropagation()}> Vai alla pagina </Link >
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="h-100 card-cliccabili">
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title>Materie</Card.Title>

                                    <Card.Text>
                                        In quest'area è possibile visualizzare le materie insegnate dalla scuola.
                                    </Card.Text>
                                    <div>
                                        <Link className="card-link text-decoration-none" to="/materie" onClick={(e) => e.stopPropagation()}> Vai alla pagina </Link >
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Carousel.Item>

            </Carousel>
        </>

    );
}

export default CaroselloFunzionalita;