import { Col, Row, Card, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchValutazioniByStudent } from "../redux/actions/valutazioniActions";
import { useEffect, useState } from "react";
import { fetchAllMaterie } from "../redux/actions/materieActions";


const VotiPerMateria = () => {

    // STATO PER LA MATERIA SELEZIONATA
    const [materiaSelezionata, setMateriaSelezionata] = useState(null);

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { materie } = useSelector(currentState => currentState.materie);
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

    // funzione per filtrare i voti per materia
    const votiFiltrati = materiaSelezionata ? votiOrdinati.filter(v => v.lezione.materia.idMateria === materiaSelezionata) : votiOrdinati;

    useEffect(() => {
        dispatch(fetchAllMaterie());
        dispatch(fetchValutazioniByStudent(idStudente));
    }, [idStudente])


    return (
        <>
            <Row>
                <Col xs={12} md={6} >
                    <button
                        className="btn btn-outline-primary mb-3"
                        onClick={() => setMateriaSelezionata(null)}
                    >
                        Mostra tutti i voti
                    </button>
                    {loading && <p>Caricamento Voti...</p>}
                    {error && <p>Errore: {error}</p>}
                    <Row className="d-flex flex-column m-auto">
                        <Col xs={12} className="align-items-center">

                            {votiFiltrati.map(v => (

                                <Card className="my-3 w-75">
                                    <Card.Body key={v.idValutazione} as={Row} className="align-items-center">

                                        <Col>
                                            <Card.Title>{v.lezione.materia.nome}</Card.Title>
                                            <Card.Text>Data: {v.lezione.data} </Card.Text>
                                            <Card.Text>Tipo: {v.tipo} </Card.Text>
                                        </Col>
                                        <Col className="d-flex justify-content-center">
                                            <Card.Text className="fs-1 text-center">

                                                <Badge pill bg={getBadgeColor(v.valore)}> {v.valore} </Badge>

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
                        {materie.map((materia) => (
                            <Col xs={12} md={6} key={materia.idMateria}>
                                <Card className=" mt-2 card-cliccabili">
                                    <Card.Body
                                        onClick={() => {

                                            setMateriaSelezionata(materia.idMateria)
                                            console.log("Materi selezionata", materiaSelezionata)
                                        }}>
                                        <Card.Title>{materia.nome}</Card.Title>

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