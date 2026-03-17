import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Compiti from "./Compiti";
import { Row, Col, ListGroup, Dropdown, Button } from "react-bootstrap";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import ModaleAssegnaCompiti from "./ModaleAssegnaCompiti";
import ModaleRegistraLezione from "./modaleRegistraLEzione";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentiByClasse } from "../redux/actions/studentiActions";
import { getLezioniByClass } from "../redux/actions/lezioniAction";

import Lezioni from "./Lezioni";
import { fetchCompitiByClass } from "../redux/actions/compitiActions";


const HomePageClasse = () => {

    // stato  e metodi per aprire il modale utile ad assegnare i compiti
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // STATO E METODI PER APRIRE IL MODALE CHE REGISTRA LA LEZIONE
    const [showLezione, setShowLezione] = useState(false);
    const openLezione = () => setShowLezione(true);
    const closeLezione = () => setShowLezione(false);


    // stato per la data
    const [selectedDate, setSelectedDate] = useState(new Date());

    const dispatch = useDispatch();

    const { idClasse, nomeClasse } = useParams();

    const token = useSelector(currentState => currentState.auth.token);

    const { studenti, loading, } = useSelector(currentState => currentState.studenti);


    useEffect(() => {
        if (token) {
            dispatch(fetchStudentiByClasse(idClasse, nomeClasse));
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
        }

    }, [idClasse, token, nomeClasse]);

    return (
        <Row>
            <DataCorrenteConCalendario selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            {loading && <p>Caricamento studenti...</p>}
            <Col xs={12} className="d-flex align-items-start ms-5">
                <h2 className="lettera-logo mb-4 fw-bold fs-2 me-3">
                    {nomeClasse}
                </h2>
                {/* apère modale per rigistrare i compiti */}
                <Button
                    variant="success"
                    className="mx-3"
                    onClick={handleShow}>
                    Assegna Compiti
                </Button>
                <Button variant="primary" onClick={openLezione} >
                    Registra lezione
                </Button>
                <ModaleRegistraLezione show={showLezione} handleClose={closeLezione} />
                <ModaleAssegnaCompiti show={show} handleClose={handleClose} />
            </Col>



            <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start ms-0 ms-md-5 ">
                <Lezioni selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                <Compiti selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            </Col>
            <Col>
                <Row>

                    <Col className="d-flex flex-column align-items-center mt-3 gap-2">
                        <h3 className="lettera-logo fw-bold">Lista studenti</h3>
                        {
                            studenti?.content?.map(stud => (

                                <Dropdown
                                    key={stud.idStudente}
                                    className="dropdown-card w-100">
                                    <Dropdown.Toggle variant="light"
                                        className="dropdown-card-toggle d-flex justify-content-between align-items-center w-100" >
                                        {stud.nome} {stud.cognome} </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Presente</Dropdown.Item>
                                        <Dropdown.Item>Assente</Dropdown.Item>
                                        <Dropdown.Item>Assegna voto</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ))
                        }

                    </Col>

                </Row>


            </Col>

        </Row>
    );

}

export default HomePageClasse;