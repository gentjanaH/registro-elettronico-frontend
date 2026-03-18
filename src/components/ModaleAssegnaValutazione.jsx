import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { assegnaValutazione } from "../redux/actions/valutazioniActions";
import { useState } from "react";


const ModaleAssegnaValutazione = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const { idStudente } = useParams();


    const [lezione, setLezione] = useState("");
    const [valore, setValore] = useState("");
    const [tipo, setTipo] = useState("");

    const { lezioni, loading, error } = useSelector(state => state.lezioni);



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

        dispatch(assegnaValutazione(idStudente, valutazioneData));
        console.log("Voto: ", valutazioneData)
        alert("Voto salvato con successo!");
        handleClose();
    };

    return (

        <Modal

            show={show} onHide={handleClose} centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Assegna Voto</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="p-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Lezione</Form.Label>
                        {/* map delle lezioni della giornata */}
                        <Form.Select
                            value={lezione}
                            onChange={(e) => setLezione(e.target.value)}
                        >
                            <option value="">Seleziona lezione</option>
                            {lezioni.map(lez => (
                                <option
                                    key={lez.idLezione}
                                    value={lez.idLezione}>{lez.nomeMateria} - {lez.data} - {lez.descrizione}</option>


                            ))}

                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Voto</Form.Label>
                        {/* map delle lezioni della giornata */}
                        <Form.Select
                            value={valore}
                            onChange={(e) => setValore(e.target.value)}
                        >
                            <option value="">Seleziona un voto</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>

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

                </Form>
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
    );


}

export default ModaleAssegnaValutazione;