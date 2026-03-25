import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import ModaleRegistraUtente from "./ModaleRegistraUtente";
import ModaleAssegnaMateria from "./ModaleAssegnaMateria";
import ModaleVisualizzaUtenti from "./ModaleVisualizzaUtenti";
import ModaleRegistraCorsoExtra from "./ModaleRegistraCorsoExtra";
import ModaleVisualizzaCorsiExtra from "./ModaleVisualizzaCorsiExtra";

const azioni = [
    {
        key: "registraUtente",
        titolo: "Registra utente",
        descrizione: "Aggiungi un nuovo professore, studente, genitore o amministratore",
        icona: "👤",
        colore: "#0d6efd"
    },
    {
        key: "assegnaMateria",
        titolo: "Assegna materie",
        descrizione: "Collega uno o più materie a un docente esistente",
        icona: "📚",
        colore: "#198754"
    },
    {
        key: "corsoExtra",
        titolo: "Corso extra-curricolare",
        descrizione: "Registra un nuovo corso extra-curricolare",
        icona: "🎨",
        colore: "#fd7e14",

    },
    {
        key: "visualizzaUtenti",
        titolo: "Visualizza utenti",
        descrizione: "Consulta tutti gli utenti del sistema divisi per ruolo",
        icona: "👥",
        colore: "#6f42c1"
    },
    {
        key: "visualizzaCorsi",
        titolo: "Visualizza corsi-extra-curricolari",
        descrizione: "Consulta tutti i corsi del sistema",
        icona: "🎨",
        colore: "#42c1c1"
    }
];

const PaginaAmministratore = () => {

    const [modaleAperto, setModaleAperto] = useState(null);

    return (
        <div style={{ padding: "2rem 1.5rem", maxWidth: "960px", margin: "0 auto" }}>

            {/* Header */}
            <div style={{ marginBottom: "2rem" }}>
                <h2 style={{ fontWeight: 500, marginBottom: "4px" }}>Area Amministratore</h2>
                <p style={{ color: "#6c757d", fontSize: "0.95rem", margin: 0 }}>
                    Gestione utenti e configurazione del sistema
                </p>
            </div>

            {/* Card azioni */}
            <Row className="g-3">
                {azioni.map(azione => (
                    <Col key={azione.key} xs={12} sm={6} xl={4}>
                        <div
                            style={{
                                background: "white",
                                border: "1px solid #e9ecef",
                                borderRadius: "12px",
                                padding: "1.25rem",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                                opacity: azione.disabilitato ? 0.55 : 1,
                                transition: "box-shadow 0.15s",
                            }}
                        >
                            {/* Icona */}
                            <div
                                style={{
                                    width: "42px",
                                    height: "42px",
                                    borderRadius: "10px",
                                    background: `${azione.colore}18`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "20px"
                                }}
                            >
                                {azione.icona}
                            </div>

                            {/* Testo */}
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500, fontSize: "0.95rem", marginBottom: "4px" }}>
                                    {azione.titolo}
                                </div>
                                <div style={{ fontSize: "0.82rem", color: "#6c757d", lineHeight: 1.4 }}>
                                    {azione.descrizione}
                                </div>
                            </div>

                            {/* Bottone */}
                            <Button
                                size="sm"
                                disabled={azione.disabilitato}
                                onClick={() => setModaleAperto(azione.key)}
                                style={{
                                    background: azione.disabilitato ? "#e9ecef" : azione.colore,
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "7px 0",
                                    fontSize: "0.85rem",
                                    color: azione.disabilitato ? "#adb5bd" : "white",
                                    width: "100%"
                                }}
                            >
                                {azione.disabilitato ? "Non disponibile" : "Apri"}
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Modali */}
            <ModaleRegistraUtente
                show={modaleAperto === "registraUtente"}
                handleClose={() => setModaleAperto(null)}
            />
            <ModaleAssegnaMateria
                show={modaleAperto === "assegnaMateria"}
                handleClose={() => setModaleAperto(null)}
            />
            <ModaleVisualizzaUtenti
                show={modaleAperto === "visualizzaUtenti"}
                handleClose={() => setModaleAperto(null)}
            />

            <ModaleRegistraCorsoExtra
                show={modaleAperto === "corsoExtra"}
                handleClose={() => setModaleAperto(null)}
            />

            <ModaleVisualizzaCorsiExtra
                show={modaleAperto === "visualizzaCorsi"}
                handleClose={() => setModaleAperto(null)}
            />


        </div>
    );
};

export default PaginaAmministratore;