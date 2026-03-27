import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { registraLezione } from "../redux/actions/lezioniAction";
import { fetchAllMaterie } from "../redux/actions/materieActions";
import { fetchCorsiExtra } from "../redux/actions/corsiExtraActions";


const ModaleRegistraLezione = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const { idClasse } = useParams();
    const { professore } = useSelector(s => s.auth);
    const { materie } = useSelector(s => s.materie);

    const { corsi } = useSelector(s => s.corsiExtra);
    const { user } = useSelector(s => s.auth);

    const [data, setData] = useState("");
    const [inizioLezione, setInizioLezione] = useState("");
    const [fineLezione, setFineLezione] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [idMateria, setIdMateria] = useState("");
    const [materieProf, setMaterieProf] = useState([]);
    const [alertMsg, setAlertMsg] = useState(null);
    const [alertVariant, setAlertVariant] = useState("danger");

    const handleClose_ = () => {
        setAlertMsg(null);
        handleClose();
    };

    const handleSubmit = () => {
        if (!idMateria || !data || !descrizione || !inizioLezione || !fineLezione) {
            setAlertMsg("Compila tutti i campi prima di procedere.");
            setAlertVariant("danger");
            return;
        }
        dispatch(registraLezione(idClasse, {
            data,
            inizioLezione,
            fineLezione,
            descrizione,
            idMateria
        }));
        setData("");
        setInizioLezione("");
        setFineLezione("");
        setDescrizione("");
        setIdMateria("");
        setAlertMsg("Lezione registrata con successo!");
        setAlertVariant("success");
        setTimeout(() => { setAlertMsg(null); handleClose(); }, 1500);
    };

    const corsiProf = corsi.filter(
        c => String(c.idProfessore) === String(professore?.idProfessore)
            && String(c.idClasse) === String(idClasse)
    );

    useEffect(() => {
        if (!materie?.length) {
            dispatch(fetchAllMaterie());
        }
        dispatch(fetchCorsiExtra());
    }, []);

    useEffect(() => {
        if (!professore?.materie?.length || !materie?.length) return;

        console.log("prima materia professore:", professore.materie[0]);
        console.log("prima materia store:", materie[0]);

        const idMaterieProf = professore.materie.map(m => String(m.idMateria));
        const filtrate = materie.filter(m => idMaterieProf.includes(String(m.idMateria)));



        console.log("filtrate:", filtrate);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMaterieProf(filtrate);

    }, [professore, materie]);

    const tuttiCampiCompilati = data && inizioLezione && fineLezione && idMateria && descrizione;

    return (
        <Modal show={show} onHide={handleClose_} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registra nuova lezione</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {/* Data */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>1.</span>
                        Data della lezione
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </Form.Group>

                {/* Orario affiancato */}
                <div className="row g-2 mb-3">
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>2.</span>
                                Inizio
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={inizioLezione}
                                onChange={(e) => setInizioLezione(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>3.</span>
                                Fine
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={fineLezione}
                                onChange={(e) => setFineLezione(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                {/* Materia */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="form-step-numero">4.</span>
                        Materia o corso
                    </Form.Label>
                    <div style={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        padding: "6px",
                        background: "#f8f9fa"
                    }}>
                        {(materieProf.length > 0 ? materieProf : materie).length > 0 && (
                            <>
                                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6c757d", padding: "4px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    Materie
                                </div>
                                {(materieProf.length > 0 ? materieProf : materie).map(m => (
                                    <div
                                        key={m.idMateria}
                                        onClick={() => setIdMateria(m.idMateria)}
                                        style={{
                                            padding: "8px 12px",
                                            marginBottom: "4px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            backgroundColor: idMateria === m.idMateria ? "#e7f1ff" : "white",
                                            border: idMateria === m.idMateria ? "2px solid #0d6efd" : "1px solid #ddd",
                                            fontSize: "0.9rem",
                                            transition: "all 0.15s"
                                        }}
                                    >
                                        {m.nome}
                                    </div>
                                ))}
                            </>
                        )}

                        {corsiProf.length > 0 && (
                            <>
                                <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6c757d", padding: "4px 8px", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "4px" }}>
                                    Corsi extra-curricolari
                                </div>
                                {corsiProf.map(c => (
                                    <div
                                        key={c.idCorso}
                                        onClick={() => setIdMateria(c.idCorso)}
                                        style={{
                                            padding: "8px 12px",
                                            marginBottom: "4px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            backgroundColor: idMateria === c.idCorso ? "#e7f1ff" : "white",
                                            border: idMateria === c.idCorso ? "2px solid #0d6efd" : "1px solid #ddd",
                                            fontSize: "0.9rem",
                                            transition: "all 0.15s"
                                        }}
                                    >
                                        {c.nome}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </Form.Group>

                {/* Descrizione */}
                <Form.Group className="mb-1">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>5.</span>
                        Descrizione
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Es. Spiegazione pag. 34-35, introduzione ai limiti..."
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                    />
                </Form.Group>

                {alertMsg && (
                    <Alert
                        variant={alertVariant}
                        onClose={() => setAlertMsg(null)}
                        dismissible
                        className="mb-0 mt-3 py-2"
                        style={{ fontSize: "0.88rem" }}
                    >
                        {alertVariant === "success"
                            ? <><i className="bi bi-check-circle me-2"></i>{alertMsg}</>
                            : <><i className="bi bi-exclamation-triangle me-2"></i>{alertMsg}</>
                        }
                    </Alert>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose_}>
                    Annulla
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!tuttiCampiCompilati}
                >
                    Registra lezione
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleRegistraLezione;