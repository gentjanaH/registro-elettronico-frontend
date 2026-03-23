import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { registraCompito } from "../redux/actions/compitiActions";
import { fetchAllMaterie } from "../redux/actions/materieActions";

const ModaleAssegnaCompiti = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { idClasse } = useParams();
    const { professore } = useSelector(s => s.auth);
    const { materie } = useSelector(s => s.materie);

    const [dataConsegna, setDataConsegna] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [idMateria, setIdMateria] = useState("");
    const [materieProf, setMaterieProf] = useState([]);

    useEffect(() => {
        if (!materie?.length) {
            dispatch(fetchAllMaterie());
        }
    }, []);

    useEffect(() => {
        if (!professore?.materie?.length || !materie?.length) return;

        console.log("prima materia professore:", professore.materie[0]);
        console.log("prima materia store:", materie[0]);

        const idMaterieProf = professore.materie.map(m => String(m.idMateria));
        const filtrate = materie.filter(m => idMaterieProf.includes(String(m.idMateria)));

        console.log("filtrate:", filtrate);
        setMaterieProf(filtrate);

    }, [professore, materie]);

    // ✅ Aggiunto handleAssegna mancante
    const handleAssegna = () => {
        if (!idMateria || !dataConsegna || !descrizione) {
            alert("Compila tutti i campi prima di procedere.");
            return;
        }
        dispatch(registraCompito(idClasse, {
            descrizione,
            dataDiConsegna: dataConsegna,
            idMateria,
        }));
        setDataConsegna("");
        setDescrizione("");
        setIdMateria("");
        handleClose();
        alert("Compito assegnato con successo!");
    };

    return (
        <Modal show={show} onHide={handleClose} centered>

            <Modal.Header closeButton>
                <Modal.Title className="prof-section-titolo">Assegna compito</Modal.Title>
            </Modal.Header>

            <Form className="p-3">
                <Form.Group className="mb-3" controlId="dataConsegna">
                    <Form.Label className="login-label">Data di consegna</Form.Label>
                    <Form.Control
                        type="date"
                        value={dataConsegna}
                        onChange={(e) => setDataConsegna(e.target.value)}
                        className="login-input"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="selectMateria">
                    <Form.Label className="login-label">Materia</Form.Label>
                    <Form.Select
                        value={idMateria}
                        onChange={(e) => setIdMateria(e.target.value)}
                        className="login-input"
                    >
                        <option value="">Seleziona una materia</option>
                        {(materieProf.length > 0 ? materieProf : materie).map(m => (
                            <option key={m.idMateria} value={m.idMateria}>
                                {m.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descrizioneCompito">
                    <Form.Label className="login-label">Descrizione</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Massimo 100 caratteri"
                        maxLength={100}
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                        className="login-input"
                    />
                    <Form.Text className="text-muted">
                        {descrizione.length}/100 caratteri
                    </Form.Text>
                </Form.Group>
            </Form>

            <Modal.Footer>
                <Button className="classe-btn-secondary" onClick={handleClose}>Annulla</Button>
                <Button className="classe-btn-primary" onClick={handleAssegna}>Assegna compito</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default ModaleAssegnaCompiti;