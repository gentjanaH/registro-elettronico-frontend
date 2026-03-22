import { Col, Row } from "react-bootstrap";

const comunicazioni = [
    {
        id: 1,
        titolo: "Colloqui individuali",
        descrizione: "Gentili genitori, vi informiamo che in data 18/03/26 dalle 16:00 alle 19:00 si terranno i colloqui individuali con i professori.",
        professore: "Nome Cognome",
        data: "15/03/2026",
        tipo: "Colloquio",
    },
    {
        id: 2,
        titolo: "Uscita didattica",
        descrizione: "Si comunica che in data 25/03/26 è prevista un'uscita didattica al Museo della Scienza. Si prega di compilare il modulo di autorizzazione.",
        professore: "Nome Cognome",
        data: "14/03/2026",
        tipo: "Evento",
    },
    {
        id: 3,
        titolo: "Verifica di matematica",
        descrizione: "Si avvisano gli studenti che in data 20/03/26 si terrà una verifica scritta sugli argomenti trattati nelle ultime settimane.",
        professore: "Nome Cognome",
        data: "13/03/2026",
        tipo: "Verifica",
    },
];

const tipoConfig = {
    Colloquio: { color: "#0ea5e9", bg: "rgba(14,165,233,0.10)", icona: "bi-people" },
    Evento: { color: "#10b981", bg: "rgba(16,185,129,0.10)", icona: "bi-calendar-event" },
    Verifica: { color: "#f59e0b", bg: "rgba(245,158,11,0.10)", icona: "bi-pencil-square" },
    Avviso: { color: "#f87171", bg: "rgba(248,113,113,0.10)", icona: "bi-megaphone" },
};

const Bacheca = () => {
    return (
        <div className="classe-wrapper">

            {/* ── Hero ── */}
            <div className="classe-hero">
                <div className="classe-hero-left">
                    <span className="login-badge mb-2">Comunicazioni</span>
                    <h1 className="classe-titolo">Bacheca</h1>
                    <p className="prof-sub">Avvisi, comunicazioni e aggiornamenti dalla scuola.</p>
                </div>
            </div>

            <div className="classe-container">
                <Row className="g-4">
                    {comunicazioni.map(c => {
                        const cfg = tipoConfig[c.tipo] || tipoConfig["Avviso"];
                        return (
                            <Col key={c.id} xs={12} md={6} xl={4}>
                                <div className="bacheca-card">

                                    <div className="bacheca-card-top">
                                        <span
                                            className="bacheca-tipo-badge"
                                            style={{ color: cfg.color, background: cfg.bg }}
                                        >
                                            <i className={`bi ${cfg.icona} me-1`}></i>
                                            {c.tipo}
                                        </span>
                                        <span className="bacheca-data">
                                            <i className="bi bi-calendar3 me-1"></i>
                                            {c.data}
                                        </span>
                                    </div>

                                    <div
                                        className="bacheca-accent-bar"
                                        style={{ background: cfg.color }}
                                    ></div>

                                    <h3 className="bacheca-titolo">{c.titolo}</h3>
                                    <p className="bacheca-descrizione">{c.descrizione}</p>

                                    <div className="bacheca-footer">
                                        <div className="bacheca-avatar">
                                            {c.professore.split(" ").map(w => w[0]).join("").slice(0, 2)}
                                        </div>
                                        <span className="bacheca-professore">{c.professore}</span>
                                    </div>

                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>

        </div>
    );
};

export default Bacheca;