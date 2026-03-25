import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { fetchAllMaterie } from "../redux/actions/materieActions";
import { assegnaMaterie, fetchAllProfessori } from "../redux/actions/docenteActions";

const ModaleAssegnaMateria = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { materie } = useSelector(s => s.materie);
    const { professori, loading, error } = useSelector(s => s.docenti);

    const [idProfessore, setIdProfessore] = useState("");
    const [idMaterieSelezionate, setIdMaterieSelezionate] = useState([]);

    useEffect(() => {
        if (!materie?.length) dispatch(fetchAllMaterie());
        if (!professori?.length) dispatch(fetchAllProfessori());
    }, []);

    const handleAddMateria = (idMateria) => {
        if (!idMateria || idMaterieSelezionate.includes(idMateria)) return;
        setIdMaterieSelezionate(prev => [...prev, idMateria]);
    };

    const handleRemoveMateria = (idMateria) => {
        setIdMaterieSelezionate(prev => prev.filter(id => id !== idMateria));
    };

    const handleReset = () => {
        setIdProfessore("");
        setIdMaterieSelezionate([]);
    };

    const handleClose_ = () => {
        handleReset();
        handleClose();
    };

    const handleSubmit = () => {
        if (!idProfessore || idMaterieSelezionate.length === 0) {
            alert("Seleziona un professore e almeno una materia.");
            return;
        }
        dispatch(assegnaMaterie(idProfessore, idMaterieSelezionate));
        alert("Materie assegnate con successo!");
        handleClose_();
    };

    // Materie non ancora selezionate (per non mostrarle nel select)
    const materieDisponibili = materie.filter(
        m => !idMaterieSelezionate.includes(String(m.idMateria))
    );

    return (
        <Modal show={show} onHide={handleClose_} centered>
            <Modal.Header closeButton>
                <Modal.Title>Assegna materie a un docente</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {/* Step 1 — Professore */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>1.</span>
                        Professore
                    </Form.Label>
                    <Form.Select
                        value={idProfessore}
                        onChange={e => setIdProfessore(e.target.value)}
                    >
                        <option value="">Seleziona un professore</option>
                        {professori.map(p => (
                            <option key={p.idProfessore} value={p.idProfessore}>
                                {p.nome} {p.cognome}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Step 2 — Materie */}
                <Form.Group className="mb-1">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>2.</span>
                        Materie
                    </Form.Label>

                    {!idProfessore ? (
                        <div
                            className="text-muted text-center py-3"
                            style={{ border: "1px dashed #ced4da", borderRadius: "8px", fontSize: "0.9rem" }}
                        >
                            Prima seleziona un professore
                        </div>
                    ) : (
                        <div
                            style={{
                                maxHeight: "200px",
                                overflowY: "auto",
                                border: "1px solid #ced4da",
                                borderRadius: "8px",
                                padding: "6px",
                                background: "#f8f9fa"
                            }}
                        >
                            {materieDisponibili.length === 0 ? (
                                <div className="text-muted text-center py-2" style={{ fontSize: "0.85rem" }}>
                                    Tutte le materie sono già state assegnate
                                </div>
                            ) : (
                                materieDisponibili.map(m => (
                                    <div
                                        key={m.idMateria}
                                        onClick={() => handleAddMateria(String(m.idMateria))}
                                        style={{
                                            padding: "8px 12px",
                                            marginBottom: "4px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            background: "white",
                                            border: "1px solid #ddd",
                                            fontSize: "0.9rem",
                                            transition: "background 0.15s"
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = "#e7f1ff"}
                                        onMouseLeave={e => e.currentTarget.style.background = "white"}
                                    >
                                        {m.nome}
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </Form.Group>

                {error && (
                    <div className="alert alert-danger mt-3 py-2" style={{ fontSize: "0.85rem" }}>
                        {error}
                    </div>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose_}>
                    Annulla
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!idProfessore || idMaterieSelezionate.length === 0 || loading}
                >
                    {loading ? "Salvataggio..." : "Assegna"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleAssegnaMateria;