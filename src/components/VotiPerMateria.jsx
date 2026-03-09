import { Col, Row, Card, Badge } from "react-bootstrap";


const VotiPerMateria = () => {
    return (
        <>
            <Row>
                <Col xs={12} md={6} >
                    <h1 className="titolo-carosello fs-2 fw-bolder mt-3 ms-2">
                        Tutti i voti:
                    </h1>
                    <Row className="d-flex flex-column m-auto">
                        <Col xs={12} className="align-items-center">
                            <Card className="my-3 w-75">
                                <Card.Body as={Row} className="align-items-center">

                                    <Col>
                                        <Card.Title>materia</Card.Title>
                                        <Card.Text>Data </Card.Text>
                                        <Card.Text>Tipo: ORALE-SCRITTO-PRATICO </Card.Text>
                                    </Col>
                                    <Col className="d-flex justify-content-center">
                                        <Card.Text>
                                            <h1>
                                                {/* Il colore del badge sarà in base al voto:

                                        4=danger
                                        5=warning
                                        6-10=success
                                        */}
                                                <Badge pill bg="success"> 8 </Badge>
                                            </h1> </Card.Text>
                                    </Col>


                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12}>
                            <Card className="my-3 w-75" >
                                <Card.Body as={Row} className="align-items-center ">

                                    <Col>
                                        <Card.Title>materia</Card.Title>
                                        <Card.Text>Data </Card.Text>
                                        <Card.Text>Tipo: ORALE-SCRITTO-PRATICO </Card.Text>
                                    </Col>
                                    <Col className="d-flex justify-content-center">
                                        <Card.Text>
                                            <h1>
                                                {/* Il colore del badge sarà in base al voto:

                                        4=danger
                                        5=warning
                                        6-10=success
                                        */}
                                                <Badge pill bg="success"> 8 </Badge>
                                            </h1> </Card.Text>
                                    </Col>


                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={6} >
                    <h3 className="titolo-carosello fs-3 fw-bolder my-3">
                        Guarda i voti per materia:
                    </h3>
                    <Row className="g-3">
                        {[
                            "Italiano", "Matematica", "Storia", "Geografia", "Scienze",
                            "Inglese", "Seconda Lingua", "Tecnologia", "Arte e Immagine",
                            "Musica", "Educazione Fisica", "Educazione Civica"
                        ].map((materia, i) => (
                            <Col xs={12} md={6} key={i}>
                                <Card className=" mt-2 card-cliccabili">
                                    <Card.Body>
                                        <Card.Title>{materia}</Card.Title>

                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>



            </Row>

        </>

    );


}

export default VotiPerMateria;