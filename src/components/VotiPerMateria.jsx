import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchValutazioniByStudent } from "../redux/actions/valutazioniActions";
import { useEffect, useState } from "react";
import { fetchAllMaterie } from "../redux/actions/materieActions";

const VotiPerMateria = () => {

    const [materiaSelezionata, setMateriaSelezionata] = useState(null);

    const dispatch = useDispatch();
    const { user, figlioSelezionato } = useSelector(s => s.auth);
    const { materie } = useSelector(s => s.materie);
    const { valutazioni, loading, error } = useSelector(s => s.valutazioni);
    const { idStudente } = useParams();

    const isGenitore = user?.ruolo?.ruolo === "GENITORE";
    const nomeStudente = isGenitore
        ? `${figlioSelezionato?.nome || ""} ${figlioSelezionato?.cognome || ""}`
        : `${user?.nome || ""} ${user?.cognome || ""}`;

    const getVotoConfig = (voto) => {
        if (voto <= 4) return { color: "#f87171", bg: "rgba(248,113,113,0.12)", label: "Insufficiente" };
        if (voto === 5) return { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Mediocre" };
        if (voto <= 7) return { color: "#0ea5e9", bg: "rgba(14,165,233,0.12)", label: "Sufficiente" };
        return { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "Ottimo" };
    };

    const votiOrdinati = [...valutazioni].sort((a, b) =>
        new Date(b.lezione.data) - new Date(a.lezione.data)
    );

    const votiFiltrati = materiaSelezionata
        ? votiOrdinati.filter(v => v.lezione.materia.idMateria === materiaSelezionata)
        : votiOrdinati;

    const materiaNome = materiaSelezionata
        ? materie.find(m => m.idMateria === materiaSelezionata)?.nome
        : null;

    useEffect(() => {
        dispatch(fetchAllMaterie());
        dispatch(fetchValutazioniByStudent(idStudente));
    }, [idStudente]);

    return (
        <div className="classe-wrapper">

            {/* ── Hero ── */}
            <div className="classe-hero">
                <div className="classe-hero-left">
                    <span className="login-badge mb-2">Registro voti</span>
                    <h1 className="classe-titolo">Valutazioni</h1>
                    {nomeStudente.trim() && (
                        <p className="prof-sub">{nomeStudente}</p>
                    )}
                </div>
            </div>

            <div className="classe-container">
                <Row className="g-4">

                    {/* ── Colonna sinistra: lista voti ── */}
                    <Col xs={12} lg={6}>
                        <div className="classe-section-card">

                            <div className="prof-section-header mb-3">
                                <i className="bi bi-star prof-section-icona"></i>
                                <h2 className="prof-section-titolo">
                                    {materiaNome ? `Voti — ${materiaNome}` : "Tutti i voti"}
                                </h2>
                            </div>

                            {materiaSelezionata && (
                                <button
                                    className="voti-reset-btn mb-3"
                                    onClick={() => setMateriaSelezionata(null)}
                                >
                                    <i className="bi bi-arrow-left me-2"></i>
                                    Mostra tutti
                                </button>
                            )}

                            {loading && <p className="prof-stato">Caricamento voti...</p>}
                            {error && <p className="prof-stato text-danger">Errore: {error}</p>}

                            {!loading && votiFiltrati.length === 0 && (
                                <div className="assenze-empty">
                                    <i className="bi bi-journal-x assenze-empty-icona"></i>
                                    <p className="assenze-empty-testo">Nessun voto disponibile</p>
                                </div>
                            )}

                            <div className="voti-list">
                                {votiFiltrati.map(v => {
                                    const cfg = getVotoConfig(v.valore);
                                    return (
                                        <div key={v.idValutazione} className="voto-card">
                                            <div className="voto-info">
                                                <span className="voto-materia">
                                                    {v.lezione.materia.nome}
                                                </span>
                                                <span className="voto-data">
                                                    <i className="bi bi-calendar3 me-1"></i>
                                                    {v.lezione.data}
                                                </span>
                                                <span className="voto-tipo">
                                                    <i className="bi bi-tag me-1"></i>
                                                    {v.tipo}
                                                </span>
                                            </div>
                                            <div
                                                className="voto-numero"
                                                style={{ color: cfg.color, background: cfg.bg }}
                                            >
                                                {v.valore}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </Col>

                    {/* ── Colonna destra: materie ── */}
                    <Col xs={12} lg={6}>
                        <div className="classe-section-card">

                            <div className="prof-section-header mb-3">
                                <i className="bi bi-book prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Filtra per materia</h2>
                            </div>

                            <Row className="g-2">
                                {materie.map((materia) => (
                                    <Col xs={12} sm={6} key={materia.idMateria}>
                                        <div
                                            className={`materia-card ${materiaSelezionata === materia.idMateria ? "materia-card-attiva" : ""}`}
                                            onClick={() => setMateriaSelezionata(materia.idMateria)}
                                        >
                                            <span className="materia-nome">{materia.nome}</span>
                                            <i className="bi bi-arrow-right materia-arrow"></i>
                                        </div>
                                    </Col>
                                ))}
                            </Row>

                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    );
};

export default VotiPerMateria;