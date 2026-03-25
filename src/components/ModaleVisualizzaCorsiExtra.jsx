import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchCorsiExtra } from "../redux/actions/corsiExtraActions";

const RUOLI = ["professori", "studenti", "genitori", "amministratori"];

const LABELS = {
    professori: "Professori",
    studenti: "Studenti",
    genitori: "Genitori",
    amministratori: "Amministratori"
};

const COLORS = {
    professori: { bg: "#e7f1ff", border: "#b6d4fe", text: "#0a3872" },
    studenti: { bg: "#e6f4ea", border: "#a8d5b5", text: "#0a3d1f" },
    genitori: { bg: "#fff4e5", border: "#ffd59e", text: "#7a3e00" },
    amministratori: { bg: "#f3e8ff", border: "#d4a8f5", text: "#3d0a72" }
};

const ModaleVisualizzaCorsiExtra = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const { corsi, loading, error } = useSelector(s => s.corsiExtra);


    useEffect(() => {
        if (show) dispatch(fetchCorsiExtra());
    }, [show]);




    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Tutti i corsi</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">





            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Chiudi
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleVisualizzaCorsiExtra