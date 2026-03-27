import { Col, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPresenzeByStudent } from "../redux/actions/presenzeActions";
import { fetchValutazioniByStudent } from "../redux/actions/valutazioniActions";


const DashboardCircolari = ({ idStudente }) => {

    const dispatch = useDispatch();
    const { valutazioni } = useSelector(s => s.valutazioni);
    const { presenze } = useSelector(s => s.presenze);

    useEffect(() => {
        if (idStudente) {
            dispatch(fetchValutazioniByStudent(idStudente));
            dispatch(fetchPresenzeByStudent(idStudente));
        }
    }, [idStudente]);

    // Media voti — scala 4-10 convertita in percentuale 0-100
    const voti = valutazioni?.filter(v => v.valore != null) ?? [];
    const mediaVoto = voti.length > 0
        ? voti.reduce((acc, v) => acc + v.valore, 0) / voti.length
        : null;
    const mediaVotoPerc = mediaVoto != null
        ? Math.round(((mediaVoto - 4) / (10 - 4)) * 100)
        : null;

    // Media presenze — % di presenti sul totale
    const totalePresenze = presenze?.length ?? 0;
    const presenti = presenze?.filter(p => p.stato === "PRESENTE").length ?? 0;
    const mediaPresenzePerc = totalePresenze > 0
        ? Math.round((presenti / totalePresenze) * 100)
        : null;

    const getStato = (valore) => {
        if (valore == null) return "Nessun dato";
        if (valore >= 80) return "Ottimo";
        if (valore >= 60) return "Buono";
        return "Da migliorare";
    };

    const metriche = [
        {
            label: "Media valutazioni",
            valore: mediaVotoPerc,
            valoreLabel: mediaVoto != null ? mediaVoto.toFixed(1) : "—",
            colore: "#0ea5e9",
            icona: "bi-star",
            descrizione: `${voti.length} valutazioni registrate`,
            unita: "/10"
        },
        {
            label: "Media presenze",
            valore: mediaPresenzePerc,
            valoreLabel: mediaPresenzePerc != null ? `${mediaPresenzePerc}%` : "—",
            colore: "#10b981",
            icona: "bi-calendar-check",
            descrizione: `${presenti} presenze su ${totalePresenze}`,
            unita: ""
        },
    ];

    return (
        <Row className="g-3">
            {metriche.map((m) => (
                <Col key={m.label} xs={12} sm={6}>
                    <div className="dashboard-metrica-card">

                        <div className="dashboard-metrica-header">
                            <i
                                className={`bi ${m.icona} dashboard-metrica-icona`}
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
                                    value={m.valore ?? 0}
                                    text={m.valore != null ? `${m.valore}%` : "—"}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                        textSize: "18px",
                                        pathColor: m.valore != null ? m.colore : "#e2e8f0",
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
                                    {m.valoreLabel}{m.unita}
                                </span>
                                <span className="dashboard-metrica-stato">
                                    {getStato(m.valore)}
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