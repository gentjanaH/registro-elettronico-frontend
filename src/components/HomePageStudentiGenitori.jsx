import { Col, Row } from "react-bootstrap";
import DashboardCircolari from "./DashboardCircolari";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import Compiti from "./Compiti";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lezioni from "./Lezioni";
import { getLezioniByClass } from "../redux/actions/lezioniAction";
import { fetchCompitiByClass } from "../redux/actions/compitiActions";
import { useParams } from "react-router-dom";

const HomePageStudentiGenitori = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const token = useSelector(s => s.auth.token);
    const { user } = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const { idClasse, nomeClasse } = useParams();

    useEffect(() => {
        if (token) {
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
        }
    }, [idClasse, token, nomeClasse, dispatch]);

    // placeholder attività — da sostituire con dati reali
    const attivita = [
        { corso: "Laboratorio STEM", inizio: "09:00", fine: "11:00", classe: nomeClasse },
        { corso: "Progetto Lettura", inizio: "11:00", fine: "12:00", classe: nomeClasse },
        { corso: "Corso di Teatro", inizio: "14:00", fine: "16:00", classe: nomeClasse },
        { corso: "Progetto Ambiente", inizio: "16:00", fine: "17:30", classe: nomeClasse },
    ];

    return (
        <div className="classe-wrapper">

            {/* ── Hero ── */}
            <div className="classe-hero">
                <div className="classe-hero-left">
                    <span className="login-badge mb-2">
                        {user?.ruolo?.ruolo === "GENITORE" ? "Area genitori" : "Area studenti"}
                    </span>
                    <h1 className="classe-titolo">{nomeClasse}</h1>
                    <p className="prof-sub">Benvenuto nel tuo registro personale.</p>
                </div>
                <div className="classe-calendario-wrap">
                    <DataCorrenteConCalendario selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                </div>
            </div>

            {/* ── Corpo ── */}
            <div className="classe-container">
                <Row className="g-4">

                    {/* ── Colonna sinistra: lezioni + compiti ── */}
                    <Col xs={12} lg={5}>
                        <div className="classe-section-card">
                            <div className="prof-section-header mb-3">
                                <i className="bi bi-journal-bookmark prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Attività del giorno</h2>
                            </div>
                            <Lezioni selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                            <Compiti selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                        </div>
                    </Col>

                    {/* ── Colonna destra ── */}
                    <Col xs={12} lg={7}>
                        <Row className="g-4">

                            {/* Circolari */}
                            <Col xs={12}>
                                <div className="classe-section-card">
                                    <div className="prof-section-header mb-3">
                                        <i className="bi bi-megaphone prof-section-icona"></i>
                                        <h2 className="prof-section-titolo"></h2>
                                    </div>
                                    <DashboardCircolari />
                                </div>
                            </Col>

                            {/* Attività extra */}
                            <Col xs={12}>
                                <div className="classe-section-card">
                                    <div className="prof-section-header mb-1">
                                        <i className="bi bi-calendar-event prof-section-icona"></i>
                                        <h2 className="prof-section-titolo">Attività extra-curricolari</h2>
                                    </div>
                                    <p className="prof-section-sub">
                                        Previste per oggi,{" "}
                                        {selectedDate.toLocaleDateString("it-IT", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                        })}
                                    </p>

                                    {/* Header tabella */}
                                    <div className="prof-attivita-header">
                                        <span>Corso</span>
                                        <span>Inizio</span>
                                        <span>Fine</span>
                                        <span>Classe</span>
                                    </div>

                                    <div className="prof-attivita-list">
                                        {attivita.map((a, i) => (
                                            <div key={i} className="prof-attivita-row">
                                                <span className="prof-att-corso">{a.corso}</span>
                                                <span className="prof-att-badge prof-att-inizio">{a.inizio}</span>
                                                <span className="prof-att-badge prof-att-fine">{a.fine}</span>
                                                <span className="prof-att-badge prof-att-classe">{a.classe}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </Col>

                        </Row>
                    </Col>

                </Row>
            </div>
        </div>
    );
};

export default HomePageStudentiGenitori;