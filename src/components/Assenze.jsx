import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ModaleGiustificaAssenze from "./ModaleGiustificaAssenze";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPresenzeByStudent, giustificaAssenza } from "../redux/actions/presenzeActions";

const Assenze = () => {

    const [show, setShow] = useState(false);
    const [motivo, setMotivo] = useState("");
    const [presenzaSelezionata, setPresenzaSelezionata] = useState(null);

    const dispatch = useDispatch();
    const { user, figlioSelezionato } = useSelector(s => s.auth);
    const { presenze, loading, error } = useSelector(s => s.presenze);
    const { idStudente } = useParams();

    const isGenitore = user?.ruolo?.ruolo === "GENITORE";

    // ✅ Fix: nome ricavato dal ruolo — studente da user, genitore da figlioSelezionato
    const nomeStudente = isGenitore
        ? `${figlioSelezionato?.nome || ""} ${figlioSelezionato?.cognome || ""}`
        : `${user?.nome || ""} ${user?.cognome || ""}`;

    const giustifica = () => {
        dispatch(giustificaAssenza(presenzaSelezionata.idPresenza, motivo));
        setShow(false);
        setMotivo("");
    };

    useEffect(() => {
        dispatch(fetchPresenzeByStudent(idStudente));
    }, [idStudente]);

    const assenzeFiltered = presenze?.filter(p => p.stato !== "PRESENTE") || [];

    return (
        <div className="classe-wrapper">

            {/* ── Hero ── */}
            <div className="classe-hero">
                <div className="classe-hero-left">
                    <span className="login-badge mb-2">Registro presenze</span>
                    <h1 className="classe-titolo">Assenze</h1>
                    {nomeStudente.trim() && (
                        <p className="prof-sub">{nomeStudente}</p>
                    )}
                </div>
            </div>

            {/* ── Corpo ── */}
            <div className="classe-container">

                {loading && <p className="prof-stato">Caricamento assenze...</p>}
                {error && <p className="prof-stato text-danger">Errore: {error}</p>}

                {!loading && assenzeFiltered.length === 0 && (
                    <div className="assenze-empty">
                        <i className="bi bi-check-circle assenze-empty-icona"></i>
                        <p className="assenze-empty-testo">Nessuna assenza registrata</p>
                    </div>
                )}

                <Row className="g-3">
                    {assenzeFiltered.map(p => (
                        <Col key={p.idPresenza} xs={12} md={6} lg={4}>
                            <div className={`assenza-card ${p.stato === "GIUSTIFICATO" ? "assenza-giustificata" : "assenza-da-giustificare"}`}>

                                <div className="assenza-card-header">
                                    <span className="assenza-data">
                                        <i className="bi bi-calendar3 me-2"></i>
                                        {p.data}
                                    </span>
                                    <span className={`assenza-badge ${p.stato === "GIUSTIFICATO" ? "badge-giustificata" : "badge-da-giustificare"}`}>
                                        {p.stato === "GIUSTIFICATO" ? "Giustificata" : "Da giustificare"}
                                    </span>
                                </div>

                                <div className="assenza-materia">
                                    <i className="bi bi-book me-2"></i>
                                    {p.nomeMateria}
                                </div>

                                {isGenitore && p.stato !== "GIUSTIFICATO" && (
                                    <Button
                                        className="assenza-btn-giustifica w-100 mt-3"
                                        onClick={() => {
                                            setPresenzaSelezionata(p);
                                            setShow(true);
                                        }}
                                    >
                                        <i className="bi bi-pencil-square me-2"></i>
                                        Giustifica
                                    </Button>
                                )}
                            </div>
                        </Col>
                    ))}
                </Row>

            </div>

            <ModaleGiustificaAssenze
                show={show}
                handleClose={() => setShow(false)}
                motivo={motivo}
                setMotivo={setMotivo}
                onConfirm={giustifica}
                data={presenzaSelezionata?.data}
            />

        </div>
    );
};

export default Assenze;