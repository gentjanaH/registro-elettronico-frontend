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

const GIORNI_LABEL = {
    LUNEDI: "Lunedì",
    MARTEDI: "Martedì",
    MERCOLEDI: "Mercoledì",
    GIOVEDI: "Giovedì",
    VENERDI: "Venerdì"
};

const HomePageStudentiGenitori = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const dispatch = useDispatch();
    const { idClasse, nomeClasse } = useParams();

    const { corsi } = useSelector(s => s.corsiExtra);
    const { studente, figlioSelezionato, user, token } = useSelector(s => s.auth);

    const studenteAttivo = user?.ruolo?.ruolo === "GENITORE" ? figlioSelezionato : studente;

    const corsiIscritto = corsi.filter(
        c => c.studentiIscritti?.some(s => s.idStudente === studenteAttivo?.idStudente)
    );

    useEffect(() => {
        if (token) {
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
            dispatch(fetchCorsiExtra());
        }
    }, [idClasse, token, nomeClasse, dispatch]);

    return (
        <div className="classe-wrapper">

            {/* Hero */}
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

            {/* Corpo */}
            <div className="classe-container">
                <Row className="g-4">

                    {/* Colonna sinistra: lezioni + compiti */}
                    <Col xs={12} lg={5}>
                        <div className="classe-section-card">
                            <div className="prof-section-header mb-3">
                                <i className="bi bi-journal-bookmark prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Attività del giorno</h2>
                            </div>
                            <Lezioni selectedDate={selectedDate} idClasse={idClasse} />
                            <Compiti selectedDate={selectedDate} idClasse={idClasse} />
                        </div>
                    </Col>

                    {/* Colonna destra */}
                    <Col xs={12} lg={7}>
                        <Row className="g-4">

                            {/* Circolari */}
                            <Col xs={12}>
                                <div className="classe-section-card">
                                    <div className="prof-section-header mb-3">
                                        <i className="bi bi-megaphone prof-section-icona"></i>
                                        <h2 className="prof-section-titolo">Circolari</h2>
                                    </div>
                                    <DashboardCircolari />
                                </div>
                            </Col>

                            {/* Attività extra */}
                            <Col xs={12}>
                                <div className="classe-section-card">
                                    <div className="prof-section-header mb-2">
                                        <i className="bi bi-calendar-event prof-section-icona"></i>
                                        <h2 className="prof-section-titolo">Attività extra-curricolari</h2>
                                    </div>

                                    {corsiIscritto.length === 0 ? (
                                        <div className="lezioni-empty">
                                            <i className="bi bi-calendar-x lezioni-empty-icona"></i>
                                            <p className="lezioni-empty-testo">Nessun corso extra a cui sei iscritto</p>
                                        </div>
                                    ) : (
                                        <div className="lezioni-list mt-2">
                                            {corsiIscritto.map(c => (
                                                <div key={c.idCorso} className="lezione-card">

                                                    {/* Orario */}
                                                    <div className="lezione-orario">
                                                        <span className="lezione-orario-dalle">{c.inizio?.slice(0, 5)}</span>
                                                        <div className="lezione-orario-linea"></div>
                                                        <span className="lezione-orario-alle">{c.fine?.slice(0, 5)}</span>
                                                    </div>

                                                    {/* Contenuto */}
                                                    <div className="lezione-body">
                                                        <div className="lezione-header">
                                                            <span className="lezione-materia">{c.nome}</span>
                                                            <span className="prof-att-badge prof-att-classe">
                                                                {c.nomeClasse}
                                                            </span>
                                                        </div>
                                                        <div className="lezione-professore">
                                                            <i className="bi bi-calendar3 me-1"></i>
                                                            {GIORNI_LABEL[c.giorno] ?? c.giorno}
                                                        </div>
                                                        <div className="lezione-professore">
                                                            <i className="bi bi-person me-1"></i>
                                                            {c.nomeProfessore} {c.cognomeProfessore}
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
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