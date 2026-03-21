import { useEffect, useState } from "react";
import { ListGroup, Row, Col, Button, Card } from "react-bootstrap";
import ModaleGiustificaAssenze from "./ModaleGiustificaAssenze";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPresenzeByStudent, giustificaAssenza } from "../redux/actions/presenzeActions";

const Assenze = () => {

    // stato per aprire il modale utile a giustificare le assenze
    const [show, setShow] = useState(false);
    const [motivo, setMotivo] = useState("");
    const [presenzaSelezionata, setPresenzaSelezionata] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const { presenze, loading, error } = useSelector(currentState => currentState.presenze);

    const { idStudente } = useParams();

    const isGenitore = user?.ruolo?.ruolo === "GENITORE";

    const giustifica = () => {

        dispatch(giustificaAssenza(presenzaSelezionata.idPresenza, motivo));
        setShow(false);
        setMotivo("");
    };

    useEffect(() => {

        dispatch(fetchPresenzeByStudent(idStudente));
    }, [idStudente])

    return (
        <Row className="d-flex ">
            <Col xs={12} className="d-flex flex-column align-content-center">
                <h1 className="lettera-logo fs-1 fw-bold  my-5">
                    Assenze Studente
                </h1>
                <p>ID Studente: {idStudente}</p>

                {loading && <p>Caricamento assenze...</p>}
                {error && <p>Errore: {error}</p>}

                <Row>
                    <Col xs={12} md={6}>

                        {presenze.map(p => (

                            <Card key={p.idPresenza} border="info" className="my-3">
                                <ListGroup variant="flush" >
                                    <ListGroup.Item>
                                        Data: {p.data}
                                        Lezione: {p.nomeMateria}
                                    </ListGroup.Item>
                                    <ListGroup.Item>Stato: {p.stato === "GIUSTIFICATO" ? "GIUSTIFICATA" : "DA GIUSTIFICARE"}</ListGroup.Item>
                                    <ListGroup.Item>
                                        {isGenitore && p.stato !== "GIUSTIFICATO" && (
                                            <Button
                                                variant="success"
                                                className="ms-3"
                                                onClick={() => {
                                                    setPresenzaSelezionata(p);
                                                    handleShow();
                                                }}
                                            >
                                                Giustifica
                                            </Button>
                                        )}</ListGroup.Item>
                                </ListGroup>
                            </Card>





                        ))}

                        < ModaleGiustificaAssenze
                            show={show}
                            handleClose={handleClose}
                            motivo={motivo}
                            setMotivo={setMotivo}
                            onConfirm={giustifica}
                            data={presenzaSelezionata?.data}

                        />


                    </Col>

                </Row>
            </Col>


        </Row>
    );
}
export default Assenze;