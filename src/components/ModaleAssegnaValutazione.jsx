import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { assegnaValutazione } from "../redux/actions/valutazioniActions";
import { useState } from "react";


const ModaleAssegnaValutazione = ({ show, handleClose, idStudente }) => {

    const dispatch = useDispatch();




    const [lezione, setLezione] = useState("");
    const [valore, setValore] = useState("");
    const [tipo, setTipo] = useState("");

    const { lezioni } = useSelector(state => state.lezioni);



    const handleSubmit = () => {

        if (!lezione || !valore || !tipo) {
            alert("Compila tutti i campi");
            return;
        }

        const valutazioneData = {
            idLezione: lezione,
            valore: Number(valore),
            tipo: tipo.toUpperCase(),
        };

        console.log("Invio valutazione payload:", valutazioneData);

        dispatch(assegnaValutazione(idStudente, valutazioneData));
        console.log("Voto: ", valutazioneData)
        alert("Voto salvato con successo!");
        handleClose();
    };

    return (
        <>
            <Modal

                show={show} onHide={handleClose} centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Assegna Voto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Lezione</Form.Label>

                        <div
                            style={{
                                maxHeight: "220px",
                                overflowY: "auto",
                                border: "1px solid #ced4da",
                                borderRadius: "8px",
                                padding: "8px",
                                background: "#f8f9fa"
                            }}
                        >
                            {lezioni.length === 0 && (
                                <div className="text-muted">Nessuna lezione trovata</div>
                            )}

                            {lezioni.map(lez => {
                                const isSelected = lezione === lez.idLezione;

                                return (
                                    <div
                                        key={lez.idLezione}
                                        onClick={() => setLezione(lez.idLezione)}
                                        style={{
                                            padding: "12px",
                                            marginBottom: "8px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            backgroundColor: isSelected ? "#e7f1ff" : "white",
                                            border: isSelected ? "2px solid #0d6efd" : "1px solid #ddd",
                                            transition: "0.2s"
                                        }}
                                    >
                                        <strong>{lez.nomeMateria}</strong>
                                        <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                                            {lez.data} — {lez.descrizione}
                                        </div>
                                        <div style={{ fontSize: "0.85rem" }}>
                                            Prof: {lez.cognomeProfessore}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Voto</Form.Label>
                        {/* map delle lezioni della giornata */}
                        <Form.Select
                            value={valore}
                            onChange={(e) => setValore(e.target.value)}
                        >
                            <option value="">Seleziona un voto</option>
                            <option value="4" className="fw-bold text-danger">4</option>
                            <option value="5" className="fw-bold text-warning">5</option>
                            <option value="6" className="fw-bold text-success">6</option>
                            <option value="7" className="fw-bold text-success">7</option>
                            <option value="8" className="fw-bold text-success">8</option>
                            <option value="9" className="fw-bold text-success">9</option>
                            <option value="10" className="fw-bold text-success">10</option>

                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select
                            value={tipo}
                            onChange={(e) => setTipo(e.target.value)}
                        >
                            <option value="">Seleziona tipo</option>
                            <option value="ORALE">Orale</option>
                            <option value="SCRITTO">Scritto</option>
                            <option value="PRATICO">Pratico</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annulla
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Invia
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}

export default ModaleAssegnaValutazione;