import { Container, Row, Col } from "react-bootstrap";

const OffertaFormativa = () => {
    return (
        <div className="offerta-wrapper">

            {/* ── Hero ── */}
            <div className="offerta-hero">
                <span className="login-badge mb-3">La nostra scuola</span>
                <h1 className="offerta-titolo">Offerta formativa</h1>
                <p className="offerta-hero-sub">
                    Un percorso educativo completo, inclusivo e orientato alla crescita
                    personale e culturale di ogni studente.
                </p>
            </div>

            {/* ── Intro ── */}
            <Container className="offerta-container">

                <p className="offerta-intro">
                    La nostra proposta formativa coniuga rigore accademico e attenzione
                    alla persona. Corsi curricolari, laboratori innovativi e attività
                    extracurricolari si integrano per offrire un'esperienza scolastica
                    stimolante, in grado di preparare gli studenti alle sfide del mondo
                    contemporaneo.
                </p>

                {/* ── Percorsi di studio ── */}
                <section className="offerta-section">
                    <h2 className="offerta-section-titolo">
                        <span className="offerta-accent">Percorsi</span> di studio
                    </h2>
                    <p className="offerta-testo">
                        Offriamo indirizzi diversificati per rispondere alle inclinazioni
                        e agli obiettivi di ciascuno studente, con un'attenzione
                        costante all'innovazione didattica e alla personalizzazione
                        dell'apprendimento.
                    </p>
                    <Row className="g-3 mt-2">
                        {[
                            { titolo: "Liceo Scientifico", desc: "Matematica, fisica e scienze al centro di un percorso rigoroso e moderno." },
                            { titolo: "Liceo Classico", desc: "Lingue antiche, filosofia e letteratura per una formazione umanistica profonda." },
                            { titolo: "Liceo Linguistico", desc: "Tre lingue straniere e apertura internazionale per comunicare nel mondo." },
                            { titolo: "Istituto Tecnico", desc: "Competenze tecnico-scientifiche applicate ai settori produttivi e digitali." },
                            { titolo: "Istituto Professionale", desc: "Formazione pratica e orientamento al lavoro nei principali settori di attività." },
                        ].map((p) => (
                            <Col key={p.titolo} xs={12} sm={6} lg={4}>
                                <div className="offerta-card">
                                    <div className="offerta-card-titolo">{p.titolo}</div>
                                    <div className="offerta-card-desc">{p.desc}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </section>

                {/* ── Progetti speciali ── */}
                <section className="offerta-section">
                    <h2 className="offerta-section-titolo">
                        <span className="offerta-accent">Progetti</span> speciali
                    </h2>
                    <p className="offerta-testo">
                        Iniziative che coinvolgono attivamente gli studenti su temi
                        trasversali, promuovendo consapevolezza sociale, ambientale
                        e culturale attraverso la collaborazione e la creatività.
                    </p>
                    <div className="offerta-progetti">
                        {[
                            { nome: "Progetto Ambiente", desc: "Educazione alla sostenibilità e rispetto dell'ecosistema." },
                            { nome: "Progetto Legalità", desc: "Cultura della legalità e cittadinanza attiva." },
                            { nome: "Progetto Lettura", desc: "Promozione del libro e della lettura critica." },
                            { nome: "Progetto STEM", desc: "Scienza, tecnologia, ingegneria e matematica in chiave pratica." },
                            { nome: "Progetto Inclusione", desc: "Accoglienza, diversità e pari opportunità per tutti." },
                        ].map((p) => (
                            <div key={p.nome} className="offerta-progetto-item">
                                <div className="offerta-progetto-dot"></div>
                                <div>
                                    <span className="offerta-progetto-nome">{p.nome}</span>
                                    <span className="offerta-progetto-desc"> — {p.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </Container>
        </div>
    );
};

export default OffertaFormativa;