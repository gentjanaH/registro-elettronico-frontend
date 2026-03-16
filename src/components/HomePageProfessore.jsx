import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import DataCorrenteConCalendario from "./DataCorrenteConCalendario";

const HomePageProfessore = () => {

    const navigate = useNavigate();

    const { id_professore } = useParams();

    const vaiAllaClasse = (classe) => {
        navigate(`/classe/${classe}`);
    }
    return (
        <>
            <Row className="mt-5">

                {/* COLONNA SINISTRA */}
                <Col xs={12} className="d-flex flex-column">

                    {/* Data */}
                    <DataCorrenteConCalendario />
                    <Row>

                        <Col>

                            {/* Classi */}
                            <h3 className="lettera-logo mb-4 fw-bold fs-2 mt-4">
                                Classi
                            </h3>

                            <div className="d-flex flex-column w-50 gap-2">
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => vaiAllaClasse("2-L")}
                                >2-L</Button>
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => vaiAllaClasse("3-I")}
                                >3-I</Button>
                                <Button
                                    variant="info"
                                    size="lg"
                                    onClick={() => vaiAllaClasse("1-L")}
                                >1-L</Button>
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
