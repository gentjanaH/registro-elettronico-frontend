import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchClassi } from "../redux/actions/classiActions";
import { fetchCorsiExtra } from "../redux/actions/corsiExtraActions";

const GIORNI_LABEL = {
    LUNEDI: "Lunedì",
    MARTEDI: "Martedì",
    MERCOLEDI: "Mercoledì",
    GIOVEDI: "Giovedì",
    VENERDI: "Venerdì"
};

const HomePageProfessore = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { classi, loading, error } = useSelector(s => s.classi);
    const { corsi } = useSelector(s => s.corsiExtra);
    const { user } = useSelector(s => s.auth);

    const [selectedDate, setSelectedDate] = useState(new Date());

    const corsiProfessore = corsi.filter(
        c =>
            c.nomeProfessore?.toLowerCase() === user?.nome?.toLowerCase() &&
            c.cognomeProfessore?.toLowerCase() === user?.cognome?.toLowerCase()
    );

    useEffect(() => {
        dispatch(fetchClassi());
        dispatch(fetchCorsiExtra());
    }, []);

    const vaiAllaClasse = (idClasse, nome) => navigate(`/classe/${idClasse}/${nome}`);

    return (
        <div className="prof-wrapper">

            {/* Hero */}
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

            {/* Contenuto */}
            <div className="prof-container">
                <Row className="g-4">

                    {/* Classi */}
                    <Col xs={12} lg={5}>
                        <div className="prof-section-card">
                            <div className="prof-section-header">
                                <i className="bi bi-people prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Le tue classi</h2>
                            </div>

                            <div className="prof-classi-grid">
                                {loading && <p className="prof-stato">Caricamento classi...</p>}
                                {error && <p className="prof-stato text-danger">{error}</p>}
                                {classi?.content?.map(classe => (
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

                    {/* Corsi extra */}
                    <Col xs={12} lg={7}>
                        <div className="prof-section-card">
                            <div className="prof-section-header">
                                <i className="bi bi-calendar-event prof-section-icona"></i>
                                <h2 className="prof-section-titolo">Attività extra-curricolari</h2>
                            </div>

                            {corsiProfessore.length === 0 ? (
                                <div className="lezioni-empty">
                                    <i className="bi bi-calendar-x lezioni-empty-icona"></i>
                                    <p className="lezioni-empty-testo">Nessun corso extra assegnato</p>
                                </div>
                            ) : (
                                <div className="lezioni-list mt-2">
                                    {corsiProfessore.map(c => (
                                        <div key={c.idCorso} className="lezione-card">

                                            {/* Giorno + orario */}
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
                                            </div>

                                        </div>
                                    ))}
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