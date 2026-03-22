import { Col, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const metriche = [
    {
        label: "Media valutazioni",
        valore: 75,
        colore: "#0ea5e9",
        icona: "bi-star",
        descrizione: "Media dei voti conseguiti",
    },
    {
        label: "Media presenze",
        valore: 90,
        colore: "#10b981",
        icona: "bi-calendar-check",
        descrizione: "Percentuale di presenze",
    },
];

const DashboardCircolari = () => {
    return (
        <Row className="g-3">
            {metriche.map((m) => (
                <Col key={m.label} xs={12} sm={6}>
                    <div className="dashboard-metrica-card">

                        <div className="dashboard-metrica-header">
                            <i className={`bi ${m.icona} dashboard-metrica-icona`}
                                style={{ color: m.colore }}
                            ></i>
                            <div>
                                <div className="dashboard-metrica-label">{m.label}</div>
                                <div className="dashboard-metrica-desc">{m.descrizione}</div>
                            </div>
                        </div>

                        <div className="dashboard-metrica-chart">
                            <div style={{ width: 110 }}>
                                <CircularProgressbar
                                    value={m.valore}
                                    text={`${m.valore}%`}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                        textSize: "18px",
                                        pathColor: m.colore,
                                        trailColor: "#e2e8f0",
                                        textColor: "#0f172a",
                                    })}
                                />
                            </div>
                            <div className="dashboard-metrica-side">
                                <span
                                    className="dashboard-metrica-valore"
                                    style={{ color: m.colore }}
                                >
                                    {m.valore}%
                                </span>
                                <span className="dashboard-metrica-stato">
                                    {m.valore >= 80
                                        ? "Ottimo"
                                        : m.valore >= 60
                                            ? "Buono"
                                            : "Da migliorare"}
                                </span>
                            </div>
                        </div>

                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default DashboardCircolari;