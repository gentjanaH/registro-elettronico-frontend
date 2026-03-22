import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMaterie } from "../redux/actions/materieActions";

const Materie = () => {

    const dispatch = useDispatch();
    const { materie, loading, error } = useSelector(s => s.materie);

    useEffect(() => {
        dispatch(fetchAllMaterie());
    }, []);

    return (
        <div className="offerta-wrapper">

            {/* ── Hero ── */}
            <div className="offerta-hero">
                <span className="login-badge mb-3">Curriculum scolastico</span>
                <h1 className="offerta-titolo">Materie insegnate</h1>
                <p className="offerta-hero-sub">
                    Esplora le materie che compongono il nostro curriculum, progettate
                    per offrire una formazione completa e stimolante.
                </p>
            </div>

            <div className="offerta-container m-auto">

                {loading && <p className="prof-stato">Caricamento materie...</p>}
                {error && <p className="prof-stato text-danger">Errore: {error}</p>}

                <section className="offerta-section" style={{ marginTop: "0" }}>
                    <h2 className="offerta-section-titolo">
                        <span className="offerta-accent">Materie</span> di base
                    </h2>

                    <Row className="g-3 mt-2">
                        {materie.map((materia) => (
                            <Col xs={12} sm={6} lg={4} key={materia.idMateria}>
                                <div className="offerta-card h-100">
                                    <div className="offerta-card-titolo">{materia.nome}</div>
                                    <div className="offerta-card-desc">
                                        {materia.descrizione || "Descrizione non disponibile."}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </section>

            </div>
        </div>
    );
};

export default Materie;