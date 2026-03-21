import { Button, Col, Row, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const SelezioneProfiloFigli = () => {

    const { genitore } = useSelector(currentState => currentState.auth);

    const navigate = useNavigate();

    const figli = genitore?.figli || [];

    return (


        <>
            <Row>

                <Col>
                    Seleziona Profilo

                </Col>

                {figli.map(figlio => (

                    <Col md={4} className="mb-4">
                        <Card key={figlio.idStudente} >
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>{figlio.nome} {figlio.cognome}</Card.Title>
                                <Card.Text>
                                    Classe: {figlio.classe}
                                </Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() =>
                                        navigate(
                                            `/classe/${figlio.idClasse}/${figlio.classe}/studente/${figlio.idStudente}`
                                        )
                                    }
                                >
                                    Seleziona
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>

                ))}

            </Row>



        </>
    );

}

export default SelezioneProfiloFigli;