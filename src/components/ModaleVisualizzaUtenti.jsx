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
                    <div key={index} className="utenti-card" style={{ background: colori.bg, border: `1px solid ${colori.border}` }}>
                        <div className="utenti-card-header">
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span className="utenti-email">{utente.email}</span>
                        </div>
                        {utente.materie?.length > 0 && (
                            <div className="utenti-chips">
                                {utente.materie.map((m, i) => (
                                    <span key={i} className="utenti-chip" style={{ border: `1px solid ${colori.border}`, color: colori.text }}>
                                        {m.nome}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "studenti":
                return (
                    <div key={index} className="utenti-card" style={{ background: colori.bg, border: `1px solid ${colori.border}` }}>
                        <div className="utenti-card-header">
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span className="utenti-email">{utente.email}</span>
                        </div>
                        {(utente.nomeGenitore || utente.cognomeGenitore) && (
                            <div className="utenti-sub">
                                Genitore: {utente.nomeGenitore} {utente.cognomeGenitore}
                            </div>
                        )}
                    </div>
                );

            case "genitori":
                return (
                    <div key={index} className="utenti-card" style={{ background: colori.bg, border: `1px solid ${colori.border}` }}>
                        <div className="utenti-card-header">
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span className="utenti-email">{utente.email}</span>
                        </div>
                        {utente.figli?.length > 0 && (
                            <div className="utenti-chips">
                                {utente.figli.map((f, i) => (
                                    <span key={i} className="utenti-chip" style={{ border: `1px solid ${colori.border}`, color: colori.text }}>
                                        {f.nome} {f.cognome}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                );

            case "amministratori":
                return (
                    <div key={index} className="utenti-card" style={{ background: colori.bg, border: `1px solid ${colori.border}` }}>
                        <div className="utenti-card-header">
                            <strong>{utente.nome} {utente.cognome}</strong>
                            <span className="utenti-email">{utente.email}</span>
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
                <div className="utenti-tab-wrapper">
                    {RUOLI.map(r => {
                        const c = COLORS[r];
                        const attivo = ruoloAttivo === r;
                        return (
                            <button
                                key={r}
                                onClick={() => setRuoloAttivo(r)}
                                className={`utenti-tab ${attivo ? "utenti-tab-attivo" : ""}`}
                                style={{
                                    border: `1px solid ${attivo ? c.border : "#ddd"}`,
                                    background: attivo ? c.bg : "white",
                                    color: attivo ? c.text : "#555",
                                    fontWeight: attivo ? 500 : 400,
                                }}
                            >
                                {LABELS[r]}
                                <span
                                    className="utenti-tab-count"
                                    style={{
                                        background: attivo ? c.border : "#eee",
                                        color: attivo ? c.text : "#555",
                                    }}
                                >
                                    {dati[r]?.length ?? 0}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Lista */}
                <div className="utenti-lista">
                    {loading && (
                        <div className="utenti-stato">Caricamento...</div>
                    )}
                    {!loading && error && (
                        <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>
                    )}
                    {!loading && !error && lista.length === 0 && (
                        <div className="utenti-stato">Nessun utente trovato</div>
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

export default ModaleVisualizzaUtenti;