import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Compiti from "./Compiti";
import { Row, Col, Button, Dropdown, Alert } from "react-bootstrap";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import ModaleAssegnaCompiti from "./ModaleAssegnaCompiti";
import ModaleRegistraLezione from "./modaleRegistraLezione";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentiByClasse } from "../redux/actions/studentiActions";
import { getLezioniByClass } from "../redux/actions/lezioniAction";
import { registraPresenza } from "../redux/actions/presenzeActions";
import Lezioni from "./Lezioni";
import { fetchCompitiByClass } from "../redux/actions/compitiActions";
import ModaleAssegnaValutazione from "./ModaleAssegnaValutazione";
import { fetchCorsiExtra } from "../redux/actions/corsiExtraActions";

const HomePageClasse = () => {

    const [show, setShow] = useState(false);
    const [showLezione, setShowLezione] = useState(false);
    const [studenteSelezionato, setStudenteSelezionato] = useState(null);
    const [showValutazione, setShowValutazione] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [presenze, setPresenze] = useState({});
    const [alertPresenza, setAlertPresenza] = useState(null);

    const dispatch = useDispatch();
    const { idClasse, nome: nomeClasse } = useParams();
    const token = useSelector(s => s.auth.token);
    const { studenti, loading } = useSelector(s => s.studenti);
    const lezioni = useSelector(s => s.lezioni.lezioni);



    // filtra i corsi di questa classe
    const corsiExtra = useSelector(s => s.corsiExtra.corsi).filter(
        c => String(c.idClasse) === String(idClasse)
    );

    const openValutazione = (idStudente) => { setShowValutazione(true); setStudenteSelezionato(idStudente); };
    const closeValutazione = () => { setShowValutazione(false); setStudenteSelezionato(null); };

    const recuperoLezioneAttiva = (selectedDay) => {
        if (!lezioni?.length || !selectedDay) return null;
        const oggi = new Date().toISOString().split("T")[0];
        const selected = new Date(selectedDay).toISOString().split("T")[0];
        if (selected !== oggi) return null;
        const now = new Date();
        const minutiCorrenti = now.getHours() * 60 + now.getMinutes();
        return lezioni.find(lez => {
            if (lez.data !== oggi || !lez.inizioLezione || !lez.fineLezione) return false;
            const [hI, mI] = lez.inizioLezione.split(":").map(Number);
            const [hF, mF] = lez.fineLezione.split(":").map(Number);
            return minutiCorrenti >= hI * 60 + mI && minutiCorrenti <= hF * 60 + mF;
        }) || null;
    };

    const handlePresenza = (idStudente, stato) => {
        const lezioneAttiva = recuperoLezioneAttiva(selectedDate);
        if (!lezioneAttiva) {
            setAlertPresenza("Devi prima registrare una lezione attiva per poter segnare presenze e assenze.");
            setTimeout(() => setAlertPresenza(null), 4000);
            return;
        }
        dispatch(registraPresenza(idStudente, { idLezione: lezioneAttiva.idLezione, stato }));
        setPresenze(prev => ({ ...prev, [idStudente]: stato }));
    };

    useEffect(() => {
        if (token) {
            dispatch(fetchCorsiExtra());
            dispatch(fetchStudentiByClasse(idClasse, nomeClasse));
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
        }
    }, [idClasse, token, nomeClasse, dispatch]);

    const lezioneAttiva = recuperoLezioneAttiva(selectedDate);

    const getPresenzaConfig = (idStudente) => {
        if (!lezioneAttiva) return { bg: "#94a3b8", icon: "bi-question-circle", label: "—" };
        const stato = presenze[idStudente];
        if (stato === "PRESENTE") return { bg: "#10b981", icon: "bi-check-circle-fill", label: "Presente" };
        if (stato === "ASSENTE") return { bg: "#f87171", icon: "bi-x-circle-fill", label: "Assente" };
        return { bg: "#94a3b8", icon: "bi-question-circle", label: "—" };
    };

    return (
        <div className="classe-wrapper">

            {/* ── Hero ── */}
            <div className="classe-hero">
                <div className="classe-hero-left">
                    <span className="login-badge mb-2">Registro di classe</span>
                    <h1 className="classe-titolo">{nomeClasse}</h1>
                    <div className="classe-azioni">
                        <Button className="classe-btn-primary" onClick={() => setShow(true)}>
                            <i className="bi bi-pencil-square me-2"></i>Assegna compiti
                        </Button>
                        <Button className="classe-btn-secondary" onClick={() => setShowLezione(true)}>
                            <i className="bi bi-journal-text me-2"></i>Registra lezione
                        </Button>
                    </div>
                </div>
                <div className="classe-calendario-wrap">
                    <DataCorrenteConCalendario selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                </div>
            </div>

            {/* ── Modali ── */}
            <ModaleRegistraLezione show={showLezione} handleClose={() => setShowLezione(false)} />
            <ModaleAssegnaCompiti show={show} handleClose={() => setShow(false)} />
            <ModaleAssegnaValutazione show={showValutazione} handleClose={closeValutazione} idStudente={studenteSelezionato} idClasse={idClasse} />

            {/* ── Corpo ── */}
            <div className="classe-container">
                <Row className="g-4">

                    {/* ── Colonna sinistra: lezioni + compiti ── */}
                    <Col xs={12} lg={7}>
                        <div className="classe-section-card">
                            <div className="prof-section-header mb-3">
                                <i className="bi bi-journal-bookmark prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Attività del giorno</h2>
                            </div>
                            <Lezioni selectedDate={selectedDate} onChangeDate={setSelectedDate} idClasse={idClasse} />
                            <Compiti selectedDate={selectedDate} onChangeDate={setSelectedDate} idClasse={idClasse} />
                        </div>
                    </Col>

                    {/* ── Colonna destra: studenti ── */}
                    <Col xs={12} lg={5}>
                        <div className="classe-section-card">
                            <div className="prof-section-header mb-1">
                                <i className="bi bi-people prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Lista studenti</h2>
                            </div>

                            {loading && <p className="prof-stato">Caricamento studenti...</p>}

                            {alertPresenza && (
                                <Alert
                                    variant="warning"
                                    onClose={() => setAlertPresenza(null)}
                                    dismissible
                                    className="py-2 mb-2"
                                    style={{ fontSize: "0.85rem" }}
                                >
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {alertPresenza}
                                </Alert>
                            )}

                            {/* Classe normale — studenti diretti */}
                            {studenti?.content?.length > 0 && (
                                <>
                                    <div className="classe-legenda">
                                        <span className="classe-legenda-item">
                                            <span className="classe-dot" style={{ background: "#10b981" }}></span>Presente
                                        </span>
                                        <span className="classe-legenda-item">
                                            <span className="classe-dot" style={{ background: "#f87171" }}></span>Assente
                                        </span>
                                        <span className="classe-legenda-item">
                                            <span className="classe-dot" style={{ background: "#94a3b8" }}></span>N/D
                                        </span>
                                    </div>


                                    <div className="classe-studenti-list">
                                        {studenti?.content?.map(stud => {
                                            const cfg = getPresenzaConfig(stud.idStudente);
                                            return (
                                                <Dropdown key={stud.idStudente} className="w-100">
                                                    <Dropdown.Toggle className="classe-studente-toggle w-100">
                                                        <div className="classe-studente-info">
                                                            <div className="classe-studente-avatar">
                                                                {stud.nome?.charAt(0)}{stud.cognome?.charAt(0)}
                                                            </div>
                                                            <span className="classe-studente-nome">
                                                                {stud.nome} {stud.cognome}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className="classe-presenza-dot"
                                                            style={{ background: cfg.bg }}
                                                            title={cfg.label}
                                                        >
                                                            <i className={`bi ${cfg.icon}`}></i>
                                                        </span>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu className="classe-dropdown-menu">
                                                        <Dropdown.Item
                                                            className="classe-dropdown-item"
                                                            onClick={() => handlePresenza(stud.idStudente, "PRESENTE")}
                                                        >
                                                            <i className="bi bi-check-circle me-2 text-success"></i>Presente
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            className="classe-dropdown-item"
                                                            onClick={() => handlePresenza(stud.idStudente, "ASSENTE")}
                                                        >
                                                            <i className="bi bi-x-circle me-2 text-danger"></i>Assente
                                                        </Dropdown.Item>
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item
                                                            className="classe-dropdown-item"
                                                            onClick={() => openValutazione(stud.idStudente)}
                                                        >
                                                            <i className="bi bi-star me-2 text-warning"></i>Assegna voto
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            );
                                        })}
                                    </div>
                                </>
                            )}

                            {/* Classe corsi extra — studenti iscritti ai corsi */}
                            {(!studenti?.content?.length) && (
                                <>
                                    {corsiExtra.length === 0 ? (
                                        <div className="lezioni-empty">
                                            <i className="bi bi-people lezioni-empty-icona"></i>
                                            <p className="lezioni-empty-testo">Nessuno studente iscritto</p>
                                        </div>
                                    ) : (
                                        <div className="classe-studenti-list">
                                            {corsiExtra.flatMap(c => c.studentiIscritti ?? [])
                                                .filter((s, i, arr) => arr.findIndex(x => x.idStudente === s.idStudente) === i)
                                                .map(stud => (
                                                    <Dropdown key={stud.idStudente} className="w-100">
                                                        <Dropdown.Toggle className="classe-studente-toggle w-100">
                                                            <div className="classe-studente-info">
                                                                <div className="classe-studente-avatar">
                                                                    {stud.nome?.charAt(0)}{stud.cognome?.charAt(0)}
                                                                </div>
                                                                <span className="classe-studente-nome">
                                                                    {stud.nome} {stud.cognome}
                                                                </span>
                                                            </div>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="classe-dropdown-menu">
                                                            <Dropdown.Item className="classe-dropdown-item" onClick={() => openValutazione(stud.idStudente)}>
                                                                <i className="bi bi-star me-2 text-warning"></i>Assegna voto
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                ))
                                            }
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default HomePageClasse;