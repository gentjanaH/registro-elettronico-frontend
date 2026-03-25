import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchClassi } from "../redux/actions/classiActions";
import { fetchCorsiExtra } from "../redux/actions/corsiExtraActions";

const HomePageProfessore = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { classi, loading, error } = useSelector(s => s.classi);
    const { corsi } = useSelector(s => s.corsiExtra);
    const { user, professore } = useSelector(s => s.auth);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const corsiProfessore = corsi.filter(
        c =>
            c.nomeProfessore?.toLowerCase() === user?.nome?.toLowerCase() &&
            c.cognomeProfessore?.toLowerCase() === user?.cognome?.toLowerCase())

    useEffect(() => {
        dispatch(fetchClassi());
        dispatch(fetchCorsiExtra())

    }, []);

    const vaiAllaClasse = (idClasse, nome) => navigate(`/classe/${idClasse}/${nome}`);


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


                            {corsiProfessore.length === 0 ? (
                                <p className="prof-stato">Nessun corso extra a cui sei iscritto.</p>
                            ) : (
                                <div className="prof-attivita-list">
                                    {corsiProfessore.map(c => (
                                        <>
                                            <div key={c.idCorso} className="prof-attivita-row d-flex justify-content-between">
                                                <div className="d-flex flex-column w-50">
                                                    <span className="prof-att-corso fw-bold mb-3">{c.giorno}</span>
                                                    <span className="prof-att-corso">{c.nome}</span>

                                                </div>
                                                <div className="d-flex flex-column w-50">
                                                    <div className="d-flex justify-content-evenly mb-3">
                                                        <span className="prof-att-badge prof-att-inizio">{c.inizio?.slice(0, 5)}</span>
                                                        <span className="prof-att-badge prof-att-fine">{c.fine?.slice(0, 5)}</span>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <span className="prof-att-badge prof-att-classe">{c.nomeClasse}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    ))
                                    }
                                </div>
                            )}


                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    );
};

export default HomePageProfessore;