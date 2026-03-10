import { Col, Row } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

const Bacheca = () => {


    return (

        <>
            <Row>
                <Col xs={12}>
                    <h1 className="my-3 lettera-logo fs-1 fw-bold">
                        Bacheca
                    </h1>
                    <Row>
                        <Col xs={12} md={6} className="my-3">
                            <Card>
                                <Card.Header className="fs-4">Titolo: COLLOQUI INDIVIDUALI </Card.Header>
                                <Card.Body>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            Descizione:
                                            "Gentili genitori, vi informiamo che in data 18/03/26 dale 16:00 alle 19:00 si terranno i colloqui individuali con i professori."
                                        </p>
                                        <footer className="blockquote-footer text-black">
                                            Professore: <cite title="Source Title">Nome Cognome</cite>
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Card>

                        </Col>

                    </Row>
                </Col>




            </Row>



        </>

    );


}

export default Bacheca;