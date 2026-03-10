import { Card, Col, Row, ListGroup } from "react-bootstrap";
import DashboardCircolari from "./DashboardCircolari";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import Compiti from "./Compiti";


const HomePageStudentiGenitori = () => {



    return (
        <Row className="text-center mt-5">

            <DataCorrenteConCalendario />
            <Col xs={12} className="d-flex align-items-start ms-5">
                <h3 className="lettera-logo mb-4 fw-bold fs-2 me-3">
                    Presente
                </h3>

            </Col>



            <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start ms-0 ms-md-5 ">
                <Compiti />
            </Col>
            <Col>
                <Row className="mt-5  me-md-3">

                    <DashboardCircolari />

                    <Col xs={12} className="mt-5">
                        <Row>


                            <h3 className="lettera-logo fw-bold">Attivita extra-curricolari</h3>
                            <h4 className="lead">Previste per oggi:</h4>
                            <Col xs={12} className="d-flex flex-column align-items-center mt-3 g-4">
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
                                    <ListGroup.Item variant="primary">classe</ListGroup.Item>
                                </ListGroup>
                                <ListGroup horizontal className="mb-3 shadow-lg">
                                    <ListGroup.Item variant="info">Nome corso</ListGroup.Item>
                                    <ListGroup.Item variant="success">Inizio</ListGroup.Item>
                                    <ListGroup.Item variant="danger">Fine</ListGroup.Item>
                                    <ListGroup.Item variant="primary">classe</ListGroup.Item>
                                </ListGroup>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            </Col>
        </Row>
    );
}
export default HomePageStudentiGenitori;