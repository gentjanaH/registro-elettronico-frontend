import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUtentiPerRuolo } from "../redux/actions/utentiActions";
import { addFiglio, removeFiglio } from "../redux/actions/genitoriActions";

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
    const [genitoreAperto, setGenitoreAperto] = useState(null);
    const [nuovoFiglioId, setNuovoFiglioId] = useState("");
    const [confermaRimozione, setConfermaRimozione] = useState(null);

    useEffect(() => {
        if (show) dispatch(fetchUtentiPerRuolo());
    }, [show]);

    useEffect(() => {
        // aggiorna il genitore aperto dopo il refresh dei dati
        if (genitoreAperto) {
            const aggiornato = genitori.find(g => g.idGenitore === genitoreAperto.idGenitore);
            if (aggiornato) setGenitoreAperto(aggiornato);
        }
    }, [genitori]);

    const dati = { professori, studenti, genitori, amministratori };
    const lista = dati[ruoloAttivo] ?? [];
    const colori = COLORS[ruoloAttivo];

    const handleAddFiglio = (idGenitore) => {
        const val = nuovoFiglioId.trim();
        if (!val) return;
        dispatch(addFiglio(idGenitore, val, () => {
            dispatch(fetchUtentiPerRuolo());
            setNuovoFiglioId("");
        }));
    };

    const handleRemoveFiglio = (idGenitore, idStudente) => {
        dispatch(removeFiglio(idGenitore, idStudente, () => {
            dispatch(fetchUtentiPerRuolo());
            setConfermaRimozione(null);
        }));
    };

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

            case "genitori": {
                const isAperto = genitoreAperto?.idGenitore === utente.idGenitore;
                return (
                    <div key={index} className="utenti-card" style={{ background: colori.bg, border: `1px solid ${colori.border}` }}>

                        {/* Header genitore */}
                        <div className="utenti-card-header">
                            <div>
                                <strong>{utente.nome} {utente.cognome}</strong>
                                <div className="utenti-email">{utente.email}</div>
                            </div>
                            <button
                                onClick={() => {
                                    setGenitoreAperto(isAperto ? null : utente);
                                    setNuovoFiglioId("");
                                    setConfermaRimozione(null);
                                }}
                                style={{
                                    background: "transparent",
                                    border: `1px solid ${colori.border}`,
                                    borderRadius: "6px",
                                    color: colori.text,
                                    fontSize: "0.78rem",
                                    padding: "3px 10px",
                                    cursor: "pointer"
                                }}
                            >
                                {isAperto ? "Chiudi" : "Gestisci figli"}
                            </button>
                        </div>

                        {/* Figli attuali */}
                        {utente.figli?.length > 0 && !isAperto && (
                            <div className="utenti-chips">
                                {utente.figli.map((f, i) => (
                                    <span key={i} className="utenti-chip" style={{ border: `1px solid ${colori.border}`, color: colori.text }}>
                                        {f.nome} {f.cognome}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Pannello gestione figli */}
                        {isAperto && (
                            <div style={{
                                marginTop: "12px",
                                padding: "12px",
                                background: "white",
                                borderRadius: "8px",
                                border: `1px solid ${colori.border}`
                            }}>
                                <div style={{ fontSize: "0.82rem", fontWeight: 500, color: colori.text, marginBottom: "8px" }}>
                                    Figli associati
                                </div>

                                {utente.figli?.length === 0 ? (
                                    <div className="utenti-sub mb-2">Nessun figlio associato</div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                                        {utente.figli.map((f, i) => (
                                            <div key={i} style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                padding: "6px 10px",
                                                borderRadius: "6px",
                                                background: colori.bg,
                                                border: `1px solid ${colori.border}`
                                            }}>
                                                <span style={{ fontSize: "0.85rem", color: colori.text }}>
                                                    {f.nome} {f.cognome}
                                                </span>

                                                {confermaRimozione === f.idStudente ? (
                                                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                                        <span style={{ fontSize: "0.75rem", color: "#dc3545" }}>Rimuovere?</span>
                                                        <button
                                                            className="btnConferma"
                                                            onClick={() => handleRemoveFiglio(utente.idGenitore, f.idStudente)}
                                                        >
                                                            <i className="bi bi-check-lg"></i>
                                                        </button>
                                                        <button
                                                            className="btnAnnulla"
                                                            onClick={() => setConfermaRimozione(null)}
                                                        >
                                                            <i className="bi bi-x-lg"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="btnElimina"
                                                        onClick={() => setConfermaRimozione(f.idStudente)}
                                                        title="Rimuovi figlio"
                                                    >
                                                        <i className="bi bi-trash3"></i>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Aggiungi figlio */}
                                <div style={{ fontSize: "0.82rem", fontWeight: 500, color: colori.text, marginBottom: "6px" }}>
                                    Aggiungi figlio
                                </div>
                                <div className="d-flex gap-2">
                                    <Form.Control
                                        type="text"
                                        placeholder="UUID dello studente"
                                        value={nuovoFiglioId}
                                        onChange={e => setNuovoFiglioId(e.target.value)}
                                        style={{ fontSize: "0.85rem" }}
                                    />
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => handleAddFiglio(utente.idGenitore)}
                                        disabled={!nuovoFiglioId.trim()}
                                    >
                                        Aggiungi
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            }

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

                <div className="utenti-tab-wrapper">
                    {RUOLI.map(r => {
                        const c = COLORS[r];
                        const attivo = ruoloAttivo === r;
                        return (
                            <button
                                key={r}
                                onClick={() => {
                                    setRuoloAttivo(r);
                                    setGenitoreAperto(null);
                                    setNuovoFiglioId("");
                                    setConfermaRimozione(null);
                                }}
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

                <div className="utenti-lista">
                    {loading && <div className="utenti-stato">Caricamento...</div>}
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