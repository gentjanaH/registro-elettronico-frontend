import { useParams } from "react-router-dom";
import { useState } from "react";
import Compiti from "./Compiti";
import { Row, Col, ListGroup, Dropdown, Button } from "react-bootstrap";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import ModaleAssegnaCompiti from "./ModaleAssegnaCompiti";
const HomePageClasse = () => {

    // stato per aprire il modale utile ad assegnare i compiti
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { nomeClasse } = useParams();



    return (
        <Row>
            <DataCorrenteConCalendario />
            <Col xs={12} className="d-flex align-items-start ms-5">
                <h3 className="lettera-logo mb-4 fw-bold fs-2 me-3">
                    Homepage della classe {nomeClasse}
                </h3>
                {/* apère modale per rigistrare i compiti */}
                <Button
                    variant="success"
                    className="ms-3"
                    onClick={handleShow}>
                    Assegna Compiti
                </Button>
                <ModaleAssegnaCompiti show={show} handleClose={handleClose} />
            </Col>



            <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start ms-0 ms-md-5 ">
                <Compiti />
            </Col>
            <Col>
                <Row>

                    <Col className="d-flex flex-column align-items-center mt-3 gap-2">
                        <h3 className="lettera-logo fw-bold">Lista studenti</h3>

                        <Dropdown className="dropdown-card w-100">
                            <Dropdown.Toggle variant="light"
                                className="dropdown-card-toggle d-flex justify-content-between align-items-center w-100" >
                                Nome Cognome </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Presente</Dropdown.Item>
                                <Dropdown.Item>Assente</Dropdown.Item>
                                <Dropdown.Item>Assegna voto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="dropdown-card w-100">
                            <Dropdown.Toggle variant="light"
                                className="dropdown-card-toggle d-flex justify-content-between align-items-center w-100" >
                                Nome Cognome </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Presente</Dropdown.Item>
                                <Dropdown.Item>Assente</Dropdown.Item>
                                <Dropdown.Item>Assegna voto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="dropdown-card w-100">
                            <Dropdown.Toggle variant="light"
                                className="dropdown-card-toggle d-flex justify-content-between align-items-center w-100" >
                                Nome Cognome </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Presente</Dropdown.Item>
                                <Dropdown.Item>Assente</Dropdown.Item>
                                <Dropdown.Item>Assegna voto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown className="dropdown-card w-100">
                            <Dropdown.Toggle variant="light"
                                className="dropdown-card-toggle d-flex justify-content-between align-items-center w-100" >
                                Nome Cognome </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Presente</Dropdown.Item>
                                <Dropdown.Item>Assente</Dropdown.Item>
                                <Dropdown.Item>Assegna voto</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Col>

                </Row>


            </Col>

        </Row>
    );

}

export default HomePageClasse;