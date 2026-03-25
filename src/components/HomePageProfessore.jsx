import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchClassi } from "../redux/actions/classiActions";

const HomePageProfessore = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { classi, loading, error } = useSelector(s => s.classi);
    const { user } = useSelector(s => s.auth);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => { dispatch(fetchClassi()); }, []);

    const vaiAllaClasse = (idClasse, nome) => navigate(`/classe/${idClasse}/${nome}`);

    // placeholder attività — da sostituire con dati reali
    const attivita = [
        { corso: "Laboratorio STEM", inizio: "09:00", fine: "11:00", classe: "3A" },
        { corso: "Progetto Lettura", inizio: "11:00", fine: "12:00", classe: "2B" },
        { corso: "Corso di Teatro", inizio: "14:00", fine: "16:00", classe: "4C" },
        { corso: "Progetto Ambiente", inizio: "16:00", fine: "17:30", classe: "1A" },
    ];

    return (
        <div className="prof-wrapper">

            {/* ── Header ── */}
            <div className="prof-hero">
                <div>
                    <span className="login-badge mb-2">Area docenti</span>
                    <h1 className="prof-titolo">
                        Bentornato{user?.nome ? `, ${user.nome}` : ""}
                    </h1>
                    <p className="prof-sub">Ecco il riepilogo della tua giornata scolastica.</p>
                </div>
                <div className="prof-calendario-wrap">
                    <DataCorrenteConCalendario
                        selectedDate={selectedDate}
                        onChangeDate={setSelectedDate}
                    />
                </div>
            </div>

            {/* ── Contenuto ── */}
            <div className="prof-container">
                <Row className="g-4">

                    {/* ── Classi ── */}
                    <Col xs={12} lg={5}>
                        <div className="prof-section-card">
                            <div className="prof-section-header">
                                <i className="bi bi-people prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Le tue classi</h2>
                            </div>

                            <div className="prof-classi-grid">
                                {loading && (
                                    <p className="prof-stato">Caricamento classi...</p>
                                )}
                                {error && (
                                    <p className="prof-stato text-danger">{error}</p>
                                )}
                                {classi?.content?.map((classe) => (
                                    <button
                                        key={classe.idClasse}
                                        className="prof-classe-btn"
                                        onClick={() => vaiAllaClasse(classe.idClasse, classe.nome)}
                                    >
                                        <span className="prof-classe-nome">{classe.nome}</span>
                                        <i className="bi bi-arrow-right prof-classe-arrow"></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* ── Attività extra ── */}
                    <Col xs={12} lg={7}>
                        <div className="prof-section-card">
                            <div className="prof-section-header">
                                <i className="bi bi-calendar-event prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Attività extra-curricolari</h2>
                            </div>
                            <p className="prof-section-sub">
                                Previste per oggi, {selectedDate.toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" })}
                            </p>

                            {/* Header tabella */}
                            <div className="prof-attivita-header">
                                <span>Corso</span>
                                <span>Inizio</span>
                                <span>Fine</span>
                                <span>Classe</span>
                            </div>

                            {/* Righe */}
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
            </div>
        </div>
    );
};

export default HomePageProfessore;