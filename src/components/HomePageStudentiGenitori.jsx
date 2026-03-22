import { Card, Col, Row, ListGroup } from "react-bootstrap";
import DashboardCircolari from "./DashboardCircolari";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import Compiti from "./Compiti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lezioni from "./Lezioni";
import { getLezioniByClass } from "../redux/actions/lezioniAction";
import { fetchCompitiByClass } from "../redux/actions/compitiActions";
import { useParams } from "react-router-dom";


const HomePageStudentiGenitori = () => {

    // stato per la data
    const [selectedDate, setSelectedDate] = useState(new Date());

    // STATO LEZIONI
    // const lezioni = useSelector(currentState => currentState.lezioni.lezioni)

    const token = useSelector(currentState => currentState.auth.token);
    const dispatch = useDispatch();

    const { idClasse, nomeClasse } = useParams();

    useEffect(() => {
        if (token) {
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
        }



    }, [idClasse, token, nomeClasse, dispatch]);


    return (
        <Row className="text-center mt-5">

            <DataCorrenteConCalendario selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            <Col xs={12} className="d-flex align-items-start ms-5">
                <h3 className="lettera-logo mb-4 fw-bold fs-2 me-3">
                    Lezioni
                </h3>

            </Col>



            <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start ms-0 ms-md-5 ">
                <Compiti selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                <Lezioni selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            </Col>
            <Col>
                <Row className="mt-5  me-md-3">

                    <DashboardCircolari />

                    <Col xs={12} className="mt-5">
                        <Row>


                            <h3 className="lettera-logo fw-bold">Attivita extra-curricolari</h3>
                            <h4 className="lead">Previste per oggi:</h4>
                            <Col xs={12} className="d-flex flex-column align-items-center mt-3 g-4">
                                <div className="row">
                                    <ListGroup horizontal className="mb-3 shadow-lg col-12">
                                        <ListGroup.Item variant="info" className="col-3">Nome corso</ListGroup.Item>
                                        <ListGroup.Item variant="success" className="col-3">Inizio</ListGroup.Item>
                                        <ListGroup.Item variant="danger" className="col-3">Fine</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="col-3">Classe</ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <div className="row">
                                    <ListGroup horizontal className="mb-3 shadow-lg col-12">
                                        <ListGroup.Item variant="info" className="col-3">Nome corso</ListGroup.Item>
                                        <ListGroup.Item variant="success" className="col-3">Inizio</ListGroup.Item>
                                        <ListGroup.Item variant="danger" className="col-3">Fine</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="col-3">Classe</ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <div className="row">
                                    <ListGroup horizontal className="mb-3 shadow-lg col-12">
                                        <ListGroup.Item variant="info" className="col-3">Nome corso</ListGroup.Item>
                                        <ListGroup.Item variant="success" className="col-3">Inizio</ListGroup.Item>
                                        <ListGroup.Item variant="danger" className="col-3">Fine</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="col-3">Classe</ListGroup.Item>
                                    </ListGroup>
                                </div>
                                <div className="row">
                                    <ListGroup horizontal className="mb-3 shadow-lg col-12">
                                        <ListGroup.Item variant="info" className="col-3">Nome corso</ListGroup.Item>
                                        <ListGroup.Item variant="success" className="col-3">Inizio</ListGroup.Item>
                                        <ListGroup.Item variant="danger" className="col-3">Fine</ListGroup.Item>
                                        <ListGroup.Item variant="primary" className="col-3">Classe</ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            </Col>
        </Row>
    );
}
export default HomePageStudentiGenitori;