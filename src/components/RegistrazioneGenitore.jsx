import { useState, useEffect } from "react";
import { Button, Col, Form, Row, Alert } from "react-bootstrap";

const RegistrazioneGenitore = ({ ruolo }) => {

    const [figli, setFigli] = useState([
        { nome: "", cognome: "", codice: "" }
    ]);
    const [alertMsg, setAlertMsg] = useState(null);

    useEffect(() => {
        console.log("Figli attuali:", figli);
    }, [figli]);

    const aggiungiFiglio = () => {
        if (figli.length < 4) {
            setFigli([...figli, { nome: "", cognome: "", codice: "" }]);
        } else {
            setAlertMsg("Puoi aggiungere al massimo 4 figli tramite il sito. Per registrarne di più, contatta la segreteria.");
            setTimeout(() => setAlertMsg(null), 5000);
        }
    };

    const rimuoviFiglio = (index) => {
        const updated = [...figli];
        updated.splice(index, 1);
        setFigli(updated);
    }

    return (
        <>
            {ruolo === "GENITORE" && (
                <>
                    <h3 className="text-center my-5 titolo-carosello">Dati dei figli</h3>

                    {figli.map((figlio, index) => (
                        <Col key={index} className="mb-3 p-3 border rounded">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Figlio {index + 1}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => rimuoviFiglio(index)}
                                ></button>
                            </div>


                            <Row>
                                <Col>
                                    <Form.Control
                                        placeholder="Nome"
                                        value={figlio.nome}
                                        onChange={(e) => {
                                            const updated = [...figli];
                                            updated[index].nome = e.target.value;
                                            setFigli(updated);
                                        }}
                                    />
                                </Col>

                                <Col>
                                    <Form.Control
                                        placeholder="Cognome"
                                        value={figlio.cognome}
                                        onChange={(e) => {
                                            const updated = [...figli];
                                            updated[index].cognome = e.target.value;
                                            setFigli(updated);
                                        }}
                                    />
                                </Col>

                                <Col>
                                    <Form.Control
                                        placeholder="Codice identificativo"
                                        value={figlio.codice}
                                        onChange={(e) => {
                                            const updated = [...figli];
                                            updated[index].codice = e.target.value;
                                            setFigli(updated);
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    ))}

                    {alertMsg && (
                        <Alert
                            variant="warning"
                            onClose={() => setAlertMsg(null)}
                            dismissible
                            className="py-2 mt-2"
                            style={{ fontSize: "0.88rem" }}
                        >
                            <i className="bi bi-info-circle me-2"></i>{alertMsg}
                        </Alert>
                    )}

                    <Button
                        type="button"
                        variant="outline-info"
                        size="sm"
                        className="my-3 add-child-button"
                        onClick={aggiungiFiglio}
                    >
                        <i className="bi bi-plus me-1"></i>
                        Aggiungi figlio
                    </Button>
                </>
            )
            }
        </>
    );
};

export default RegistrazioneGenitore;
