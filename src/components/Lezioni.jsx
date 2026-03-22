import { useSelector } from "react-redux";

const Lezioni = ({ selectedDate }) => {

    const { lezioni, loading, error } = useSelector(s => s.lezioni);
    const lezioniFiltrate = lezioni.filter(
        lez => lez.data === selectedDate.toISOString().split("T")[0]
    );

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

                    </div>
                ))}
            </div>

        </div>
    );
};

export default Lezioni;