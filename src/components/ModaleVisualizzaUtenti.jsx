import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUtentiPerRuolo } from "../redux/actions/utentiActions";

const RUOLI = ["professori", "studenti", "genitori", "amministratori"];

const LABELS = {
    professori: "Professori",
    studenti: "Studenti",
    genitori: "Genitori",
    amministratori: "Amministratori"
};

const COLORS = {
    professori: { bg: "#e7f1ff", border: "#b6d4fe", text: "#0a3872" },
    studenti: { bg: "#e6f4ea", border: "#a8d5b5", text: "#0a3d1f" },
    genitori: { bg: "#fff4e5", border: "#ffd59e", text: "#7a3e00" },
    amministratori: { bg: "#f3e8ff", border: "#d4a8f5", text: "#3d0a72" }
};

const ModaleVisualizzaUtenti = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { professori, studenti, genitori, amministratori, loading, error } = useSelector(s => s.utenti);

    const [ruoloAttivo, setRuoloAttivo] = useState("professori");

    useEffect(() => {
        if (show) dispatch(fetchUtentiPerRuolo());
    }, [show]);

    const dati = { professori, studenti, genitori, amministratori };
    const lista = dati[ruoloAttivo] ?? [];
    const colori = COLORS[ruoloAttivo];

    const renderRiga = (utente, index) => {
        switch (ruoloAttivo) {
            case "professori":
                return (
                    <div key={index} style={styles.card(colori)}>
                        <div style={styles.cardHeader}>
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span style={styles.email}>{utente.email}</span>
                        </div>
                        {utente.materie?.length > 0 && (
                            <div style={styles.chips}>
                                {utente.materie.map((m, i) => (
                                    <span key={i} style={styles.chip(colori)}>{m.nome}</span>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "studenti":
                return (
                    <div key={index} style={styles.card(colori)}>
                        <div style={styles.cardHeader}>
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span style={styles.email}>{utente.email}</span>
                        </div>
                        {(utente.nomeGenitore || utente.cognomeGenitore) && (
                            <div style={{ fontSize: "0.82rem", color: "#555", marginTop: "4px" }}>
                                Genitore: {utente.nomeGenitore} {utente.cognomeGenitore}
                            </div>
                        )}
                    </div>
                );

            case "genitori":
                return (
                    <div key={index} style={styles.card(colori)}>
                        <div style={styles.cardHeader}>
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span style={styles.email}>{utente.email}</span>
                        </div>
                        {utente.figli?.length > 0 && (
                            <div style={styles.chips}>
                                {utente.figli.map((f, i) => (
                                    <span key={i} style={styles.chip(colori)}>
                                        {f.nome} {f.cognome}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "amministratori":
                return (
                    <div key={index} style={styles.card(colori)}>
                        <div style={styles.cardHeader}>
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span style={styles.email}>{utente.email}</span>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Utenti per ruolo</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {/* Tab ruoli */}
                <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
                    {RUOLI.map(r => {
                        const c = COLORS[r];
                        const attivo = ruoloAttivo === r;
                        return (
                            <button
                                key={r}
                                onClick={() => setRuoloAttivo(r)}
                                style={{
                                    padding: "6px 14px",
                                    borderRadius: "20px",
                                    border: `1px solid ${attivo ? c.border : "#ddd"}`,
                                    background: attivo ? c.bg : "white",
                                    color: attivo ? c.text : "#555",
                                    fontSize: "0.85rem",
                                    cursor: "pointer",
                                    fontWeight: attivo ? 500 : 400,
                                    transition: "0.15s"
                                }}
                            >
                                {LABELS[r]}
                                <span style={{
                                    marginLeft: "6px",
                                    background: attivo ? c.border : "#eee",
                                    color: attivo ? c.text : "#555",
                                    borderRadius: "10px",
                                    padding: "1px 7px",
                                    fontSize: "0.78rem"
                                }}>
                                    {dati[r]?.length ?? 0}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Lista */}
                <div style={{ maxHeight: "380px", overflowY: "auto" }}>
                    {loading && (
                        <div className="text-muted text-center py-4" style={{ fontSize: "0.9rem" }}>
                            Caricamento...
                        </div>
                    )}
                    {!loading && error && (
                        <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>
                    )}
                    {!loading && !error && lista.length === 0 && (
                        <div className="text-muted text-center py-4" style={{ fontSize: "0.9rem" }}>
                            Nessun utente trovato
                        </div>
                    )}
                    {!loading && lista.map((u, i) => renderRiga(u, i))}
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

const styles = {
    card: (c) => ({
        padding: "10px 14px",
        marginBottom: "8px",
        borderRadius: "8px",
        border: `1px solid ${c.border}`,
        background: c.bg,
    }),
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "6px"
    },
    email: {
        fontSize: "0.82rem",
        color: "#555"
    },
    chips: {
        display: "flex",
        flexWrap: "wrap",
        gap: "5px",
        marginTop: "6px"
    },
    chip: (c) => ({
        background: "white",
        border: `1px solid ${c.border}`,
        color: c.text,
        borderRadius: "6px",
        fontSize: "0.78rem",
        padding: "2px 8px"
    })
};

export default ModaleVisualizzaUtenti;