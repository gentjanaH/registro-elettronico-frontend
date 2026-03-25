import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCorsiExtra, iscriviStudente } from "../redux/actions/corsiExtraActions";

const GIORNI_LABEL = {
    LUNEDI: "Lunedì",
    MARTEDI: "Martedì",
    MERCOLEDI: "Mercoledì",
    GIOVEDI: "Giovedì",
    VENERDI: "Venerdì"
};

const ModaleIscrizioneCorsoExtra = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { corsi, loading, error } = useSelector(s => s.corsiExtra);
    const { studente } = useSelector(s => s.auth);
    const { figlioSelezionato } = useSelector(s => s.auth);

    const [corsoSelezionato, setCorsoSelezionato] = useState(null);

    // Usa il figlio selezionato se genitore, altrimenti lo studente loggato
    const idStudente = figlioSelezionato?.idStudente ?? studente?.idStudente;

    useEffect(() => {
        if (show) dispatch(fetchCorsiExtra());
    }, [show]);

    const handleIscrivi = () => {
        if (!corsoSelezionato || !idStudente) return;
        dispatch(iscriviStudente(corsoSelezionato, idStudente, () => {
            alert("Iscrizione effettuata con successo!");
            setCorsoSelezionato(null);
            handleClose();
        }));
    };

    // Filtra i corsi a cui lo studente non è già iscritto
    const corsiDisponibili = corsi.filter(c =>
        !c.studentiIscritti?.some(s => s.idStudente === idStudente)
    );

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Iscrizione corso extra-curricolare</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {loading && <p className="text-muted">Caricamento corsi...</p>}
                {error && <div className="alert alert-danger py-2" style={{ fontSize: "0.85rem" }}>{error}</div>}

                {!loading && corsiDisponibili.length === 0 && (
                    <div
                        className="text-muted text-center py-4"
                        style={{ border: "1px dashed #ced4da", borderRadius: "8px" }}
                    >
                        Nessun corso disponibile
                    </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {corsiDisponibili.map(corso => {
                        const isSelected = corsoSelezionato === corso.idCorso;
                        return (
                            <div
                                key={corso.idCorso}
                                onClick={() => setCorsoSelezionato(isSelected ? null : corso.idCorso)}
                                style={{
                                    padding: "12px 16px",
                                    borderRadius: "8px",
                                    border: isSelected ? "2px solid #0d6efd" : "1px solid #ddd",
                                    background: isSelected ? "#e7f1ff" : "white",
                                    cursor: "pointer",
                                    transition: "all 0.15s"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <strong style={{ fontSize: "0.95rem", color: isSelected ? "#0a3872" : "inherit" }}>
                                        {corso.nome}
                                    </strong>
                                    <span
                                        style={{
                                            fontSize: "0.78rem",
                                            background: "#f0f4ff",
                                            border: "1px solid #b6d4fe",
                                            color: "#0a3872",
                                            borderRadius: "6px",
                                            padding: "2px 8px"
                                        }}
                                    >
                                        {GIORNI_LABEL[corso.giorno]}
                                    </span>
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#555", marginTop: "4px", display: "flex", gap: "12px" }}>
                                    <span>🕐 {corso.inizio?.slice(0, 5)} – {corso.fine?.slice(0, 5)}</span>
                                    <span>👤 {corso.nomeProfessore} {corso.cognomeProfessore}</span>
                                    <span>🏫 {corso.nomeClasse}</span>
                                </div>
                                <div style={{ fontSize: "0.78rem", color: "#888", marginTop: "4px" }}>
                                    {corso.studentiIscritti?.length ?? 0} iscritti
                                </div>
                            </div>
                        );
                    })}
                </div>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Annulla</Button>
                <Button
                    variant="primary"
                    onClick={handleIscrivi}
                    disabled={!corsoSelezionato || !idStudente || loading}
                >
                    {loading ? "Iscrizione..." : "Iscriviti"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleIscrizioneCorsoExtra;