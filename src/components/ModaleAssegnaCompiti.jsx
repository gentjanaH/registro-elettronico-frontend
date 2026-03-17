import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { registraCompito } from "../redux/actions/compitiActions";
import { current } from "@reduxjs/toolkit";


const ModaleAssegnaCompiti = ({ show, handleClose }) => {
    // tramite l'api deve assegnare la classe, e l'id del professore 
    const dispatch = useDispatch();

    const { idClasse } = useParams();
    const idProf = useSelector(currentState => currentState.auth.user.idUser);

    const [dataConsegna, setDataConsegna] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [idMateria, setIdMateria] = useState("");




    return (
        <Modal

            show={show} onHide={handleClose} centered
        >

            <Form className="p-3">
                <Form.Group controlId="dataNascita">
                    <Form.Label>Data di consegna prevista</Form.Label>
                    <Form.Control
                        type="date"
                        value={dataConsegna}
                        onChange={(e) => setDataConsegna(e.target.value)} />
                </Form.Group>
                <Form.Select
                    aria-label="Default select example"
                    className="my-2"
                    value={idMateria}
                    onChange={(e) => setIdMateria(e.target.value)}>

                    <option>Materia</option>
                    <option
                        value="46aaf6f7-e427-475e-af3d-50a24bf1e5ec"
                    // value={idMateria}
                    >Matematica</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrizione del compito</Form.Label>
                    <Form.Control
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="massimo 100 caratteri" />
                </Form.Group>
            </Form>




            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Annulla</Button>
                <Button variant="primary"
                    onClick={() => {

                        const compitoData = {
                            descrizione,
                            dataDiConsegna: dataConsegna,
                            idMateria
                        };
                        dispatch(registraCompito(idClasse, compitoData));
                        handleClose();
                        alert("Compito aggiunto con successo con successo!")
                    }}>Assegna</Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModaleAssegnaCompiti;