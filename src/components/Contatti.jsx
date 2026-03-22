import { Container, Row, Col } from "react-bootstrap";

const contatti = [
    {
        titolo: "Segreteria",
        icona: "bi-envelope",
        voci: [
            { label: "Email", valore: "info@scuola.it", href: "mailto:info@scuola.it" },
            { label: "Telefono", valore: "+39 123 456 7890", href: "tel:+391234567890" },
        ],
    },
    {
        titolo: "Supporto Tecnico",
        icona: "bi-headset",
        voci: [
            { label: "Email", valore: "supporto@classboard.it", href: "mailto:supporto@classboard.it" },
            { label: "Telefono", valore: "+39 123 456 7890", href: "tel:+391234567890" },
        ],
    },
    {
        titolo: "Dirigente Scolastico",
        icona: "bi-person-badge",
        voci: [
            { label: "Email", valore: "dirigente@scuola.it", href: "mailto:dirigente@scuola.it" },
            { label: "Telefono", valore: "+39 123 456 7890", href: "tel:+391234567890" },
        ],
    },
    {
        titolo: "Dove siamo",
        icona: "bi-geo-alt",
        voci: [
            { label: "Indirizzo", valore: "Via Roma 1" },
            { label: "CAP", valore: "00100" },
            { label: "Città", valore: "Roma (RM)" },
        ],
    },
];

const Contatti = () => {
    return (
        <div className="offerta-wrapper">

            {/* ── Hero ── */}
            <div className="offerta-hero">
                <span className="login-badge mb-3">Siamo qui per te</span>
                <h1 className="offerta-titolo">Contatti</h1>
                <p className="offerta-hero-sub">
                    Per qualsiasi domanda, supporto o informazione, trovi qui tutti i riferimenti utili.
                </p>
            </div>

            <Container className="offerta-container">

                <Row className="g-4">
                    {contatti.map((c) => (
                        <Col key={c.titolo} xs={12} sm={6}>
                            <div className="contatti-card">
                                <div className="contatti-card-header">
                                    <i className={`bi ${c.icona} contatti-icona`}></i>
                                    <span className="contatti-card-titolo">{c.titolo}</span>
                                </div>
                                <div className="contatti-card-body">
                                    {c.voci.map((v) => (
                                        <div key={v.label} className="contatti-voce">
                                            <span className="contatti-label">{v.label}</span>
                                            {v.href
                                                ? <a href={v.href} className="contatti-link">{v.valore}</a>
                                                : <span className="contatti-valore">{v.valore}</span>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>

            </Container>
        </div>
    );
};

export default Contatti;