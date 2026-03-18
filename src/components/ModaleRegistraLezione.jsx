import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { registraLezione } from "../redux/actions/lezioniAction";


const ModaleRegistraLezione = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const { idClasse } = useParams();

    const [data, setData] = useState("");
    const [inizioLezione, setInizioLezione] = useState("");
    const [fineLezione, setFineLezione] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [idMateria, setIdMateria] = useState("");

    // const materie= useSelector(currentState=>currentState.materie.lista);



    const handleSubmit = () => {

        const lezioneData = {
            data,
            inizioLezione,
            fineLezione,
            descrizione,
            idMateria
        };

        dispatch(registraLezione(idClasse, lezioneData));
        alert("Lezione salvata con successo!");
        handleClose();
    };



    return (

        <Modal

            show={show} onHide={handleClose} centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Registra nuova lezione</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form className="p-3">
                    <Form.Group controlId="dataNascita">
                        <Form.Label>Data della lezione</Form.Label>
                        <Form.Control
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Inizio lezione</Form.Label>
                        <Form.Control
                            type="time"
                            value={inizioLezione}
                            onChange={(e) => setInizioLezione(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fine lezione</Form.Label>
                        <Form.Control
                            type="time"
                            value={fineLezione}
                            onChange={(e) => setFineLezione(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Materia</Form.Label>
                        {/* <Form.Select
                            value={idMateria}
                            onChange={(e) => setIdMateria(e.target.value)}
                        >
                            <option value="">Seleziona materia</option>
                            {materie?.map(m => (
                                <option key={m.idMateria} value={m.idMateria}>
                                    {m.nome}
                                </option>
                            ))}
                        </Form.Select> */}
                        <Form.Select
                            value={idMateria}
                            onChange={(e) => setIdMateria(e.target.value)}
                        >
                            <option value="">Seleziona materia</option>
                            <option value="b638e177-72b3-46cf-ac54-bedfbba8b53d">Matematica</option>
                            <option value="46aaf6f7-e427-475e-af3d-50a24bf1e5ec">Geografia</option>
                            <option value="456">altro</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Spiegazione pag: 34-35 del libro..."
                            value={descrizione}
                            onChange={(e) => setDescrizione(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>



            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Registra lezione
                </Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModaleRegistraLezione;