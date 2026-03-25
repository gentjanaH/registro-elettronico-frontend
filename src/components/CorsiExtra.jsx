import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCorsiExtra, rimuoviStudente } from "../redux/actions/corsiExtraActions";
import ModaleIscrizioneCorsoExtra from "./ModaleIscrizioneCorsoExtra";

const GIORNI_LABEL = {
    LUNEDI: "Lunedì",
    MARTEDI: "Martedì",
    MERCOLEDI: "Mercoledì",
    GIOVEDI: "Giovedì",
    VENERDI: "Venerdì"
};

const CorsiExtra = () => {

    const dispatch = useDispatch();
    const { corsi, loading, error } = useSelector(s => s.corsiExtra);
    const { user, figlioSelezionato } = useSelector(s => s.auth);

    const [showIscrizione, setShowIscrizione] = useState(false);
    const [corsoSelezionato, setCorsoSelezionato] = useState(null);

    const isGenitore = user?.ruolo?.ruolo === "GENITORE";


    const idFiglioAttivo = figlioSelezionato?.idStudente;

    const isIscritto = (corso) =>
        corso.studentiIscritti?.some(s => s.idStudente === idFiglioAttivo);

    useEffect(() => {
        dispatch(fetchCorsiExtra());
    }, []);

    const handleApriIscrizione = (corso) => {
        setCorsoSelezionato(corso);
        setShowIscrizione(true);
    };

    const handleToggleIscrizione = (corso) => {
        if (isIscritto(corso)) {
            dispatch(rimuoviStudente(corso.idCorso, idFiglioAttivo, () => {
                dispatch(fetchCorsiExtra());
            }));
        } else {
            handleApriIscrizione(corso);
        }
    };

    return (
        <div className="offerta-wrapper">

            {/* Hero */}
            <div className="offerta-hero">
                <span className="login-badge mb-3">Attività extra-curricolari</span>
                <h1 className="offerta-titolo">Corsi extra</h1>
                <p className="offerta-hero-sub">
                    Scopri i nostri laboratori e attività extra per arricchire
                    la tua esperienza scolastica oltre il curriculum tradizionale.
                </p>
            </div>

            <div className="offerta-container">

                <p className="offerta-intro">
                    Le attività extra-curricolari sono pensate per stimolare
                    curiosità, creatività e spirito di squadra. Ogni corso è
                    aperto a tutti gli studenti indipendentemente dall'indirizzo.
                </p>

                <section className="offerta-section">
                    <h2 className="offerta-section-titolo">
                        <span className="offerta-accent">Laboratori</span> e attività
                    </h2>

                    {loading && <p className="prof-stato mt-3">Caricamento corsi...</p>}
                    {error && <p className="prof-stato text-danger mt-3">{error}</p>}

                    {!loading && corsi.length === 0 && (
                        <div
                            className="text-muted text-center py-4 mt-3"
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

                                <div className="corso-body">

                                    <div className="corso-nome">{c.nome}</div>

                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", margin: "6px 0" }}>
                                        <span style={styles.badge("#e7f1ff", "#0a3872")}>
                                            📅 {GIORNI_LABEL[c.giorno]}
                                        </span>
                                        <span style={styles.badge("#e6f4ea", "#0a3d1f")}>
                                            🕐 {c.inizio?.slice(0, 5)} – {c.fine?.slice(0, 5)}
                                        </span>
                                        <span style={styles.badge("#fff4e5", "#7a3e00")}>
                                            🏫 {c.nomeClasse}
                                        </span>
                                    </div>

                                    <div style={{ fontSize: "0.82rem", color: "#555", marginBottom: "6px" }}>
                                        <i className="bi bi-person me-1"></i>
                                        {c.nomeProfessore} {c.cognomeProfessore}
                                    </div>

                                    <div style={{ fontSize: "0.78rem", color: "#888", marginBottom: "10px" }}>
                                        {c.studentiIscritti?.length ?? 0} studenti iscritti
                                    </div>

                                    {isGenitore && (
                                        <button
                                            onClick={() => handleToggleIscrizione(c)}
                                            style={{
                                                width: "100%",
                                                padding: "7px 0",
                                                borderRadius: "8px",
                                                border: isIscritto(c) ? "1px solid #dc3545" : "none",
                                                background: isIscritto(c) ? "white" : "#0d6efd",
                                                color: isIscritto(c) ? "#dc3545" : "white",
                                                fontSize: "0.85rem",
                                                fontWeight: 500,
                                                cursor: "pointer"
                                            }}
                                        >
                                            {isIscritto(c) ? "Annulla iscrizione" : "Iscriviti"}
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <ModaleIscrizioneCorsoExtra
                show={showIscrizione}
                handleClose={() => {
                    setShowIscrizione(false);
                    setCorsoSelezionato(null);
                }}
                corsoPreselezionato={corsoSelezionato}
            />
        </div>
    );
};

const styles = {
    badge: (bg, color) => ({
        background: bg,
        color: color,
        borderRadius: "6px",
        fontSize: "0.75rem",
        padding: "3px 8px",
        border: `1px solid ${color}22`
    })
};

export default CorsiExtra;