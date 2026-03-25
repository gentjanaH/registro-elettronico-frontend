import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCorsoExtra, fetchCorsiExtra } from "../redux/actions/corsiExtraActions";

const GIORNI_LABEL = {
    LUNEDI: "Lunedì",
    MARTEDI: "Martedì",
    MERCOLEDI: "Mercoledì",
    GIOVEDI: "Giovedì",
    VENERDI: "Venerdì"
};

const ModaleVisualizzaCorsiExtra = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { corsi, loading, error } = useSelector(s => s.corsiExtra);

    const [confermaId, setConfermaId] = useState(null);
    const [corsoStudenti, setCorsoStudenti] = useState(null); // corso di cui mostrare gli iscritti

    useEffect(() => {
        if (show) dispatch(fetchCorsiExtra());
    }, [show]);

    const handleDelete = (idCorso) => {
        dispatch(deleteCorsoExtra(idCorso));
        setConfermaId(null);
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Tutti i corsi extra</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {loading && <p className="prof-stato mt-3">Caricamento corsi...</p>}
                {error && <p className="prof-stato text-danger mt-3">{error}</p>}

                {!loading && corsi.length === 0 && (
                    <div
                        className="text-muted text-center py-4"
                        style={{ border: "1px dashed #ced4da", borderRadius: "8px" }}
                    >
                        Nessun corso extra disponibile al momento
                    </div>
                )}

                <div className="corsi-grid mt-3">
                    {corsi.map(c => (
                        <div key={c.idCorso} className="corso-card">

                            <div className="corso-icona-wrap">
                                <i className="bi bi-star corso-icona"></i>
                            </div>

                            <div className="corso-body" style={{ flex: 1 }}>

                                <div className="corso-nome">{c.nome}</div>

                                <div className="form-chips-wrapper">
                                    <span className="form-chip" style={{ background: "#e7f1ff", color: "#0a3872", border: "1px solid #b6d4fe", cursor: "default" }}>
                                        📅 {GIORNI_LABEL[c.giorno]}
                                    </span>
                                    <span className="form-chip" style={{ background: "#e6f4ea", color: "#0a3d1f", border: "1px solid #a8d5b5", cursor: "default" }}>
                                        🕐 {c.inizio?.slice(0, 5)} – {c.fine?.slice(0, 5)}
                                    </span>
                                    <span className="form-chip" style={{ background: "#fff4e5", color: "#7a3e00", border: "1px solid #ffd59e", cursor: "default" }}>
                                        🏫 {c.nomeClasse}
                                    </span>
                                </div>

                                <div className="utenti-sub" style={{ marginBottom: "6px" }}>
                                    <i className="bi bi-person me-1"></i>
                                    {c.nomeProfessore} {c.cognomeProfessore}
                                </div>

                                {/* Iscritti — cliccabile per espandere */}
                                <button
                                    onClick={() => setCorsoStudenti(corsoStudenti?.idCorso === c.idCorso ? null : c)}
                                    className="btnAnnulla"
                                    style={{ marginBottom: "8px", fontSize: "0.78rem" }}
                                >
                                    <i className="bi bi-people me-1"></i>
                                    {c.studentiIscritti?.length ?? 0} iscritti
                                    <i className={`bi ms-1 ${corsoStudenti?.idCorso === c.idCorso ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                                </button>

                                {/* Lista studenti iscritti */}
                                {corsoStudenti?.idCorso === c.idCorso && (
                                    <div
                                        style={{
                                            background: "#f8f9fa",
                                            border: "1px solid #ced4da",
                                            borderRadius: "6px",
                                            padding: "8px 10px",
                                            marginBottom: "8px",
                                            fontSize: "0.82rem"
                                        }}
                                    >
                                        {c.studentiIscritti?.length === 0 ? (
                                            <span className="utenti-sub">Nessuno studente iscritto</span>
                                        ) : (
                                            c.studentiIscritti.map((s, i) => (
                                                <div key={i} style={{ padding: "3px 0", color: "#333" }}>
                                                    <i className="bi bi-person-fill me-1" style={{ color: "#0d6efd" }}></i>
                                                    {s.nome} {s.cognome}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}

                                {/* Elimina con conferma */}
                                {confermaId === c.idCorso ? (
                                    <div className="d-flex align-items-center gap-2">
                                        <span style={{ fontSize: "0.78rem", color: "#dc3545" }}>Eliminare?</span>
                                        <button className="btnConferma" onClick={() => handleDelete(c.idCorso)}>
                                            <i className="bi bi-check-lg"></i>
                                        </button>
                                        <button className="btnAnnulla" onClick={() => setConfermaId(null)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="btnElimina"
                                        style={{ width: "100%" }}
                                        onClick={() => setConfermaId(c.idCorso)}
                                    >
                                        <i className="bi bi-trash3 me-1"></i>
                                        Elimina corso
                                    </button>
                                )}

                            </div>
                        </div>
                    ))}
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleVisualizzaCorsiExtra;