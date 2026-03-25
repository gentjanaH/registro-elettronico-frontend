import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";


import { fetchClassi } from "../redux/actions/classiActions";
import { fetchAllProfessori } from "../redux/actions/docenteActions";
import { addCorsoExtra } from "../redux/actions/corsiExtraActions";

const GIORNI = ["LUNEDI", "MARTEDI", "MERCOLEDI", "GIOVEDI", "VENERDI"];
const GIORNI_LABEL = {
    LUNEDI: "Lunedì",
    MARTEDI: "Martedì",
    MERCOLEDI: "Mercoledì",
    GIOVEDI: "Giovedì",
    VENERDI: "Venerdì"
};

const defaultForm = {
    nome: "",
    inizio: "",
    fine: "",
    giorno: "",
    idProfessore: "",
    idClasse: ""
};

const ModaleRegistraCorsoExtra = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { professori } = useSelector(s => s.docenti);
    const { classi } = useSelector(s => s.classi);
    const { loading, error } = useSelector(s => s.corsiExtra);

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (!professori?.length) dispatch(fetchAllProfessori());
        if (!classi?.content?.length) dispatch(fetchClassi());
    }, []);

    const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleReset = () => setForm(defaultForm);

    const handleClose_ = () => {
        handleReset();
        handleClose();
    };

    const handleSubmit = () => {
        const { nome, inizio, fine, giorno, idProfessore, idClasse } = form;
        if (!nome || !inizio || !fine || !giorno || !idProfessore || !idClasse) {
            alert("Compila tutti i campi.");
            return;
        }

        dispatch(addCorsoExtra({
            nome,
            inizio,
            fine,
            giorno,
            idProfessore,
            idClasse
        }, () => {
            alert("Corso registrato con successo!");
            handleClose_();
        }));
    };

    const tuttiCompilati = form.nome && form.inizio && form.fine &&
        form.giorno && form.idProfessore && form.idClasse;

    return (
        <Modal show={show} onHide={handleClose_} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registra corso extra-curricolare</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>1.</span>
                        Nome del corso
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Es. Laboratorio STEM"
                        value={form.nome}
                        onChange={e => handleChange("nome", e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>2.</span>
                        Giorno
                    </Form.Label>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {GIORNI.map(g => (
                            <button
                                key={g}
                                type="button"
                                onClick={() => handleChange("giorno", g)}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "8px",
                                    border: form.giorno === g ? "2px solid #0d6efd" : "1px solid #ddd",
                                    background: form.giorno === g ? "#e7f1ff" : "white",
                                    color: form.giorno === g ? "#0a3872" : "#555",
                                    fontWeight: form.giorno === g ? 500 : 400,
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                    transition: "all 0.15s"
                                }}
                            >
                                {GIORNI_LABEL[g]}
                            </button>
                        ))}
                    </div>
                </Form.Group>

                <div className="row g-2 mb-3">
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>3.</span>
                                Inizio
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={form.inizio}
                                onChange={e => handleChange("inizio", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>4.</span>
                                Fine
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={form.fine}
                                onChange={e => handleChange("fine", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>5.</span>
                        Professore
                    </Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>5.</span>
                            Professore
                        </Form.Label>
                        <div
                            style={{
                                maxHeight: "160px",
                                overflowY: "auto",
                                border: "1px solid #ced4da",
                                borderRadius: "8px",
                                padding: "6px",
                                background: "#f8f9fa"
                            }}
                        >
                            {professori.map(p => {
                                const isSelected = form.idProfessore === p.idProfessore;
                                return (
                                    <div
                                        key={p.idProfessore}
                                        onClick={() => handleChange("idProfessore", p.idProfessore)}
                                        style={{
                                            padding: "8px 12px",
                                            marginBottom: "4px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            backgroundColor: isSelected ? "#e7f1ff" : "white",
                                            border: isSelected ? "2px solid #0d6efd" : "1px solid #ddd",
                                            fontSize: "0.9rem",
                                            transition: "all 0.15s"
                                        }}
                                    >
                                        {p.nome} {p.cognome}
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Group>
                </Form.Group>

                <Form.Group className="mb-1">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>6.</span>
                        Classe
                    </Form.Label>
                    <Form.Select value={form.idClasse} onChange={e => handleChange("idClasse", e.target.value)}>
                        <option value="">Seleziona una classe</option>
                        {classi?.content?.map(c => (
                            <option key={c.idClasse} value={c.idClasse}>
                                {c.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {error && (
                    <div className="alert alert-danger mt-3 py-2" style={{ fontSize: "0.85rem" }}>
                        {error}
                    </div>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose_}>Annulla</Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!tuttiCompilati || loading}
                >
                    {loading ? "Salvataggio..." : "Registra corso"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleRegistraCorsoExtra;