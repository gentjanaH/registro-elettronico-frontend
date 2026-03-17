import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const Compiti = ({ selectedDate }) => {

    const { compiti, loading, error } = useSelector(currentState => currentState.compiti);

    const compitiFiltrati = selectedDate
        ? compiti.filter(c => {
            if (!c.dataConsegna) return false;
            try {
                const compitoData = new Date(c.dataConsegna).toISOString().split("T")[0];
                const selectedData = selectedDate.toISOString().split("T")[0];
                return compitoData === selectedData;
            } catch (error) {
                console.error("Errore nel parsing della data del compito:", c.data, error);
                return false;
            }
        })
        : compiti;

    console.log("Compiti caricati:", compiti);
    console.log("Data selezionata:", selectedDate?.toISOString().split("T")[0]);
    console.log("Formato data compiti:", compiti.map(c => c.dataConsegna));
    console.log("Compiti filtrati:", compitiFiltrati);

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

            {compitiFiltrati.map(c => (
                <Card className="mb-2" key={c.idCompito}>
                    <Card.Body>
                        <Card.Title>{c.nomeMateria}</Card.Title>
                        <Card.Text>
                            {c.descrizione}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}

        </>
    );

}
export default Compiti;