import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Compiti = ({ selectedDate }) => {

    const { compiti, loading, error } = useSelector(state => state.compiti);
    const compitiFiltrati = compiti.filter(lez => lez.data === selectedDate.toISOString().split("T")[0]);
    return (
        <>
            <h3 className="lettera-logo mb-4 fw-bold fs-1">
                COMPITI
            </h3>

            {loading && <p>Caricamento compiti...</p>}
            {error && <p className="text-danger">{error}</p>}

            {compitiFiltrati.length === 0 && !loading && (
                <p>Nessun compito registrato per questa data.</p>
            )}

            {compitiFiltrati.map(c => {
                <Card className="mb-2" key={c.idCompito}>
                    <Card.Body>
                        <Card.Title>{c.nomeMateria}</Card.Title>
                        <Card.Text>
                            {c.descrizione}
                        </Card.Text>
                    </Card.Body>
                </Card>

            })}

        </>
    );
}

export default Compiti;