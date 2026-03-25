import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLezione } from "../redux/actions/lezioniAction";

const Lezioni = ({ selectedDate, idClasse }) => {

    const dispatch = useDispatch();

    const { lezioni, loading, error } = useSelector(s => s.lezioni);
    const { professore } = useSelector(s => s.auth);

    const [confermaId, setConfermaId] = useState(null);

    const lezioniFiltrate = lezioni.filter(
        lez => lez.data === selectedDate.toISOString().split("T")[0]
            && String(lez.idClasse) === String(idClasse)
    );

    const handleDelete = (idLezione) => {
        dispatch(deleteLezione(idLezione));
        setConfermaId(null);
    };

    return (
        <div className="lezioni-wrapper">

            <div className="prof-section-header mb-3">
                <i className="bi bi-journal-bookmark prof-section-icona"></i>
                <h2 className="prof-section-titolo">Lezioni</h2>
            </div>

            {loading && <p className="prof-stato">Caricamento lezioni...</p>}
            {error && <p className="prof-stato text-danger">{error}</p>}

            {!loading && lezioniFiltrate.length === 0 && (
                <div className="lezioni-empty">
                    <i className="bi bi-journal-x lezioni-empty-icona"></i>
                    <p className="lezioni-empty-testo">Nessuna lezione per questa data</p>
                </div>
            )}

            <div className="lezioni-list">
                {lezioniFiltrate.map(lez => (
                    <div key={lez.idLezione} className="lezione-card">

                        {/* Orario */}
                        <div className="lezione-orario">
                            <span className="lezione-orario-dalle">{lez.inizioLezione.slice(0, 5)}</span>
                            <div className="lezione-orario-linea"></div>
                            <span className="lezione-orario-alle">{lez.fineLezione.slice(0, 5)}</span>
                        </div>

                        {/* Contenuto */}
                        <div className="lezione-body">
                            <div className="lezione-header">
                                <span className="lezione-materia">
                                    {lez.nomeMateria || "Materia non disponibile"}
                                </span>
                                <span className="lezione-professore">
                                    <i className="bi bi-person me-1"></i>
                                    {lez.nomeProfessore && lez.cognomeProfessore
                                        ? `${lez.nomeProfessore} ${lez.cognomeProfessore}`
                                        : "Professore non disponibile"}
                                </span>
                            </div>
                            {lez.descrizione && (
                                <p className="lezione-descrizione">{lez.descrizione}</p>
                            )}
                        </div>

                        {/* Elimina — visibile solo se la lezione è del professore loggato */}
                        {String(lez.idProfessore) === String(professore?.idProfessore) && (
                            <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", paddingLeft: "12px" }}>
                                {confermaId === lez.idLezione ? (
                                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                        <span style={{ fontSize: "0.78rem", color: "#dc3545" }}>Eliminare?</span>
                                        <button
                                            onClick={() => handleDelete(lez.idLezione)}
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
                                        onClick={() => setConfermaId(lez.idLezione)}
                                        className="btnElimina"
                                        title="Elimina lezione"
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
    );
};

export default Lezioni;