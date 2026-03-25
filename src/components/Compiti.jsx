import { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCompito } from "../redux/actions/compitiActions";

const Compiti = ({ selectedDate, idClasse }) => {

    const dispatch = useDispatch();

    const { compiti, loading, error } = useSelector(currentState => currentState.compiti);
    const { professore } = useSelector(s => s.auth);

    const [confermaId, setConfermaId] = useState(null);

    const compitiFiltrati = selectedDate
        ? compiti.filter(c => {
            if (!c.dataConsegna) return false;
            try {
                const compitoData = new Date(c.dataConsegna).toISOString().split("T")[0];
                const selectedData = selectedDate.toISOString().split("T")[0];
                return compitoData === selectedData
                    && (!idClasse || String(c.idClasse) === String(idClasse));
            } catch (error) {
                console.error("Errore nel parsing della data del compito:", c.dataConsegna, error);

                return false;
            }
        })
        : compiti;


    const handleDelete = (idCompito) => {
        dispatch(deleteCompito(idCompito));
        setConfermaId(null);
    };

    return (
        <>
            <div className="lezioni-wrapper">

                <div className="prof-section-header mb-3">
                    <i className="bi bi-pencil-square prof-section-icona"></i>
                    <h2 className="prof-section-titolo">Compiti</h2>
                </div>

                {loading && <p className="prof-stato">Caricamento compiti...</p>}
                {error && <p className="prof-stato text-danger">{error}</p>}

                {!loading && compitiFiltrati.length === 0 && (
                    <div className="lezioni-empty">
                        <i className="bi bi-pencil lezioni-empty-icona"></i>
                        <p className="lezioni-empty-testo">Nessun compito per questa data</p>
                    </div>
                )}

                <div className="lezioni-list">
                    {compitiFiltrati.map(c => (
                        <div key={c.idCompito} className="lezione-card">

                            {/* Contenuto */}
                            <div className="lezione-body">
                                <div className="lezione-header">
                                    <span className="lezione-materia">
                                        {c.nomeMateria || "Materia non disponibile"}
                                    </span>
                                    <span className="lezione-professore">
                                        <i className="bi bi-calendar3 me-1"></i>
                                        Consegna: {new Date(c.dataConsegna).toLocaleDateString("it-IT")}
                                    </span>
                                </div>
                                {c.descrizione && (
                                    <p className="lezione-descrizione">{c.descrizione}</p>
                                )}
                            </div>

                            {/* Elimina — visibile solo se il compito è del professore loggato */}
                            {String(c.idProfessore) === String(professore?.idProfessore) && (
                                <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", paddingLeft: "12px" }}>
                                    {confermaId === c.idCompito ? (
                                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                            <span style={{ fontSize: "0.78rem", color: "#dc3545" }}>Eliminare?</span>
                                            <button
                                                onClick={() => handleDelete(c.idCompito)}
                                                className="btnConferma"
                                                title="Conferma eliminazione"
                                            >
                                                <i className="bi bi-check-lg"></i>
                                            </button>
                                            <button
                                                onClick={() => setConfermaId(null)}
                                                className="btnAnnulla"
                                                title="Annulla"
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfermaId(c.idCompito)}
                                            className="btnElimina"
                                            title="Elimina compito"
                                        >
                                            <i className="bi bi-trash3"></i>
                                        </button>
                                    )}
                                </div>
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </>
    );

}
export default Compiti;