import { Col, Row, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchValutazioniByStudent } from "../redux/actions/valutazioniActions";
import { useEffect } from "react";


const VotiPerMateria = () => {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);

    const { valutazioni, loading, error } = useSelector(currentState => currentState.valutazioni);

    const { idStudente } = useParams();

    // funzione per gestire il colore del badge
    const getBadgeColor = (voto) => {
        if (voto === 4) return "danger";
        if (voto === 5) return "warning";
        return "success";
    }

    // funzione per ordinare le valutazioni in base alla data
    const votiOrdinati = [...valutazioni].sort((a, b) => {
        return new Date(b.lezione.data) - new Date(a.lezione.data);
    });

    useEffect(() => {

        dispatch(fetchValutazioniByStudent(idStudente));
    }, [idStudente])


    return (
        <>
            <Row>
                <Col xs={12} md={6} >
                    <h1 className="titolo-carosello fs-2 fw-bolder mt-3 ms-2">
                        Tutti i voti:
                    </h1>
                    {loading && <p>Caricamento Voti...</p>}
                    {error && <p>Errore: {error}</p>}
                    <Row className="d-flex flex-column m-auto">
                        <Col xs={12} className="align-items-center">

                            {votiOrdinati.map(v => (

                                <Card className="my-3 w-75">
                                    <Card.Body key={v.idValutazione} as={Row} className="align-items-center">

                                        <Col>
                                            <Card.Title>{v.lezione.materia.nome}</Card.Title>
                                            <Card.Text>Data: {v.lezione.data} </Card.Text>
                                            <Card.Text>Tipo: {v.tipo} </Card.Text>
                                        </Col>
                                        <Col className="d-flex justify-content-center">
                                            <Card.Text>
                                                <h1>
                                                    <Badge pill bg={getBadgeColor(v.valore)}> {v.valore} </Badge>
                                                </h1>
                                            </Card.Text>
                                        </Col>


                                    </Card.Body>
                                </Card>


                            ))

                            }




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