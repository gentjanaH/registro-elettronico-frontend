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
import { fetchCorsiExtra } from "../redux/actions/corsiExtraActions";

const HomePageStudentiGenitori = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const token = useSelector(s => s.auth.token);
    const { user } = useSelector(s => s.auth);
    const dispatch = useDispatch();
    const { idClasse, nomeClasse } = useParams();

    const { corsi } = useSelector(s => s.corsiExtra);
    const { studente } = useSelector(s => s.auth);

    console.log("idStudente auth:", studente?.idStudente);
    console.log("studentiIscritti:", corsi[0]?.studentiIscritti);

    useEffect(() => {
        if (token) {
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
            dispatch(fetchCorsiExtra());
        }
    }, [idClasse, token, nomeClasse, dispatch]);



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

                                    {/* Corsi a cui lo studente è iscritto */}
                                    {corsi
                                        .filter(c => c.studentiIscritti?.some(s => s.idStudente === studente?.idStudente))
                                        .length === 0 ? (
                                        <p className="prof-stato">Nessun corso extra a cui sei iscritto.</p>
                                    ) : (
                                        <div className="prof-attivita-list">
                                            {corsi
                                                .filter(c => c.studentiIscritti?.some(s => s.idStudente === studente?.idStudente))
                                                .map(c => (
                                                    <div key={c.idCorso} className="prof-attivita-row">
                                                        <span className="prof-att-corso">{c.nome}</span>
                                                        <span className="prof-att-badge prof-att-inizio">{c.inizio?.slice(0, 5)}</span>
                                                        <span className="prof-att-badge prof-att-fine">{c.fine?.slice(0, 5)}</span>
                                                        <span className="prof-att-badge prof-att-classe">{c.nomeClasse}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )}
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