import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ModaleRegistraUtente from "./ModaleRegistraUtente";
import ModaleAssegnaMateria from "./ModaleAssegnaMateria";

const PaginaAmministratore = () => {

    const [showRegistraUtente, setShowRegistraUtente] = useState(false);
    const [showAssegnaMaterie, setShowAssegnaMaterie] = useState(false);

    return (
        <>
            <h1>Area Amministratore</h1>

            <Row className="g-3 mt-2">
                <Col md={6} lg={3}>
                    <div className="p-3 border rounded h-100 d-flex flex-column gap-3">
                        <h5 className="mb-0">Registra un nuovo utente</h5>
                        <Button variant="primary" onClick={() => setShowRegistraUtente(true)}>
                            Apri modale
                        </Button>
                    </div>
                </Col>

                <Col md={6} lg={3}>
                    <div className="p-3 border rounded h-100 d-flex flex-column gap-3">
                        <h5 className="mb-0">Assegna una materia ad un docente</h5>
                        <Button variant="primary" onClick={() => setShowAssegnaMaterie(true)}>
                            Apri modale
                        </Button>
                    </div>
                </Col>

                <Col md={6} lg={3}>
                    <div className="p-3 border rounded h-100 d-flex flex-column gap-3">
                        <h5 className="mb-0">Registra un corso extra-curricolare</h5>
                        <Button variant="primary" disabled>
                            Apri modale
                        </Button>
                    </div>
                </Col>

                <Col md={6} lg={3}>
                    <div className="p-3 border rounded h-100 d-flex flex-column gap-3">
                        <h5 className="mb-0">Visualizza utenti per ruolo</h5>
                        <Button variant="primary" disabled>
                            Apri modale
                        </Button>
                    </div>
                </Col>
            </Row>

            <ModaleRegistraUtente
                show={showRegistraUtente}
                handleClose={() => setShowRegistraUtente(false)}
            />

            <ModaleAssegnaMateria
                show={showAssegnaMaterie}
                handleClose={() => setShowAssegnaMaterie(false)}
            />
        </>
    );
};

export default PaginaAmministratore;