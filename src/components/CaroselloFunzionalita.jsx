import { Col, Row, Image, Carousel, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


const CaroselloFunzionalita = () => {

    return (
        <>
            <Col xs={12} className="my-3">
                <h5 className="my-3">Scopri cosa puoi fare!</h5>
            </Col>
            <Carousel interval={null} touch={false} pause="hover" indicators={false}>

                <Carousel.Item>
                    <Row className="px-4">
                        <Col xs={12} md={4}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Area Genitori</Card.Title>

                                    <Card.Text>
                                        In quest'area i genitori possono visualizzare le assenze,
                                        i voti e le comunicazioni scolastiche dei propri figli.
                                        Potranno giustificare le assenze e visualizzare il calendario scolastico.
                                    </Card.Text>
                                    <Link className="card-link" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                    <Link className="card-link" to="/register" onClick={(e) => e.stopPropagation()}>Registrati</Link >
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} md={4}>
                            <Card className=" h-100">
                                <Card.Body>
                                    <Card.Title>Area Docenti</Card.Title>

                                    <Card.Text>
                                        In quest'area i docenti possono visualizzare le informazioni relative ai loro studenti,
                                        caricare i voti, i compiti e le comunicazioni scolastiche.
                                    </Card.Text>
                                    <Link className="card-link" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                    <Link className="card-link" to="/register" onClick={(e) => e.stopPropagation()}>Registrati</Link >
                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Area Studenti</Card.Title>

                                    <Card.Text>
                                        In quest'area i studenti possono visualizzare i loro voti,
                                        i compiti e le comunicazioni scolastiche.
                                    </Card.Text>
                                    <Link className="card-link" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >
                                    <Link className="card-link" to="/register" onClick={(e) => e.stopPropagation()}>Registrati</Link >
                                </Card.Body>
                            </Card>

                        </Col>



                    </Row>

                </Carousel.Item>
                <Carousel.Item>
                    <Row>
                        <Col xs={12} md={4}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Area Amministratori</Card.Title>

                                    <Card.Text>
                                        In quest'area gli amministratori possono gestire l'intero sistema,
                                        creare e modificare account, e visualizzare statistiche generali.
                                    </Card.Text>
                                    <Link className="card-link" to="/login" onClick={(e) => e.stopPropagation()}>Accedi</Link >

                                </Card.Body>
                            </Card>

                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Corsi extra-curricolari</Card.Title>

                                    <Card.Text>
                                        In quest'area è possibile visualizzare i corsi extra-curricolari in corso o in programma offerti dalla scuola.

                                    </Card.Text>
                                    <Link className="card-link" to="/corsi-extra-curricolari" onClick={(e) => e.stopPropagation()}> Vai alla pagina </Link >

                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={4}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title>Materie</Card.Title>

                                    <Card.Text>
                                        In quest'area è possibile visualizzare le materie insegnate dalla scuola.
                                    </Card.Text>

                                    <Link className="card-link" to="/materie" onClick={(e) => e.stopPropagation()}> Vai alla pagina </Link >

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