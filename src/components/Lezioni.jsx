import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";


const Lezioni = ({ selectedDate }) => {

    const { lezioni, loading, error } = useSelector(state => state.lezioni);
    const lezioniFiltrate = lezioni.filter(lez => lez.data === selectedDate.toISOString().split("T")[0]);
    return (
        <>
            <h3 className="lettera-logo mb-4 fw-bold fs-1">
                LEZIONI
            </h3>

            {loading && <p>Caricamento lezioni...</p>}
            {error && <p className="text-danger">{error}</p>}

            {lezioniFiltrate.length === 0 && !loading && (
                <p>Nessuna lezione registrata per questa data.</p>
            )}

            {lezioniFiltrate.map(lez => (

                <Card className="mb-2" key={lez.idLezione}>
                    <Card.Body>
                        <Card.Title className="fs-4 mt-1">{lez.nomeMateria || "Materia non disponibile"}</Card.Title>
                        <Card.Title className="fs-6">{(lez.nomeProfessore && lez.cognomeProfessore)
                            ? `${lez.nomeProfessore} ${lez.cognomeProfessore}`
                            : "Professore non disponibile"}</Card.Title>
                        <Card.Text className="mb-1">
                            <strong>Dalle:</strong> {lez.inizioLezione.slice(0, 5)}
                            <strong className="ms-3">Alle:</strong> {lez.fineLezione.slice(0, 5)}
                        </Card.Text>
                        <Card.Text>
                            {lez.descrizione}
                        </Card.Text>
                    </Card.Body>
                </Card>

            ))
            }

        </>
    );
}

export default Lezioni;