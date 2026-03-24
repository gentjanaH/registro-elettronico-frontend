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
                    <Form.Select
                        value=""
                        disabled={!idProfessore}
                        onChange={e => handleAddMateria(String(e.target.value))}
                    >
                        <option value="">
                            {idProfessore ? "Aggiungi una materia" : "Prima seleziona un professore"}
                        </option>
                        {materieDisponibili.map(m => (
                            <option key={m.idMateria} value={m.idMateria}>
                                {m.nome}
                            </option>
                        ))}
                    </Form.Select>

                    {/* Chip materie selezionate */}
                    {idMaterieSelezionate.length > 0 && (
                        <div className="d-flex flex-wrap gap-1 mt-2">
                            {idMaterieSelezionate.map(id => {
                                const m = materie.find(x => String(x.idMateria) === id);
                                return (
                                    <span
                                        key={id}
                                        style={{
                                            background: "#e7f1ff",
                                            color: "#0a3872",
                                            border: "1px solid #b6d4fe",
                                            borderRadius: "6px",
                                            fontSize: "0.82rem",
                                            padding: "4px 10px",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handleRemoveMateria(id)}
                                    >
                                        {m?.nome ?? id} ✕
                                    </span>
                                );
                            })}
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