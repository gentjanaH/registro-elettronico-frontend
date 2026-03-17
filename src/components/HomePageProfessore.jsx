import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchClassi } from "../redux/actions/classiActions";

const HomePageProfessore = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { classi, loading, error } = useSelector(currentState => currentState.classi);

    const [selectedDate, setSelectedDate] = useState(new Date());


    const vaiAllaClasse = (classe, nome) => {
        navigate(`/classe/${classe}/${nome}`);
    }


    useEffect(() => {
        dispatch(fetchClassi())
    }, []);


    return (
        <>
            <Row className="mt-5">

                {/* COLONNA SINISTRA */}
                <Col xs={12} className="d-flex flex-column">

                    {/* Data */}
                    <DataCorrenteConCalendario selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                    <Row>

                        <Col>

                            {/* Classi */}
                            <h3 className="lettera-logo mb-4 fw-bold fs-2 mt-4">
                                Classi
                            </h3>

                            <div className="d-flex flex-column w-50 gap-2">
                                {loading && <p>Caricamento classi...</p>}
                                {error && <p className="text-danger">{error}</p>}
                                {classi?.content?.map((classe) => (
                                    <Button
                                        key={classe.idClasse}
                                        variant="info"
                                        size="lg"
                                        onClick={() => vaiAllaClasse(classe.idClasse, classe.nome)}
                                    >{classe.nome}</Button>

                                ))}


                            </div>
                        </Col>
                        {/* COLONNA DESTRA */}
                        <Col xs={12} lg={6} className="mt-5 mt-lg-0">

                            <h3 className="lettera-logo fw-bold text-center">
                                Attività extra‑curricolari
                            </h3>
                            <h4 className="lead text-center mb-4">Previste per oggi:</h4>

                            {/* Lista attività */}
                            <ListGroup horizontal className="mb-3 shadow-lg">
                                <ListGroup.Item variant="info">Nome corso</ListGroup.Item>
                                <ListGroup.Item variant="success">Inizio</ListGroup.Item>
                                <ListGroup.Item variant="danger">Fine</ListGroup.Item>
                                <ListGroup.Item variant="primary">Classe</ListGroup.Item>
                            </ListGroup>

                            <ListGroup horizontal className="mb-3 shadow-lg">
                                <ListGroup.Item variant="info">Nome corso</ListGroup.Item>
                                <ListGroup.Item variant="success">Inizio</ListGroup.Item>
                                <ListGroup.Item variant="danger">Fine</ListGroup.Item>
                                <ListGroup.Item variant="primary">Classe</ListGroup.Item>
                            </ListGroup>

                            <ListGroup horizontal className="mb-3 shadow-lg">
                                <ListGroup.Item variant="info">Nome corso</ListGroup.Item>
                                <ListGroup.Item variant="success">Inizio</ListGroup.Item>
                                <ListGroup.Item variant="danger">Fine</ListGroup.Item>
                                <ListGroup.Item variant="primary">Classe</ListGroup.Item>
                            </ListGroup>

                        </Col>
                    </Row>
                </Col>



            </Row>
        </>
    );
};

export default HomePageProfessore;
