import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { registraLezione } from "../redux/actions/lezioniAction";
import { fetchAllMaterie } from "../redux/actions/materieActions";


const ModaleRegistraLezione = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const { idClasse } = useParams();
    const { professore } = useSelector(s => s.auth);
    const { materie } = useSelector(s => s.materie);

    const [data, setData] = useState("");
    const [inizioLezione, setInizioLezione] = useState("");
    const [fineLezione, setFineLezione] = useState("");
    const [descrizione, setDescrizione] = useState("");
    const [idMateria, setIdMateria] = useState("");
    const [materieProf, setMaterieProf] = useState([]);

    const handleSubmit = () => {
        if (!idMateria || !data || !descrizione || !inizioLezione || !fineLezione || !idMateria) {
            alert("Compila tutti i campi prima di procedere.");
            return;
        }
        dispatch(registraLezione(idClasse, {
            data,
            inizioLezione,
            fineLezione,
            descrizione,
            idMateria
        }));
        setData("");
        setInizioLezione("");
        setFineLezione("");
        setDescrizione("");
        setIdMateria("");

        handleClose();
        alert("Lezione registrata con successo!");
    };

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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMaterieProf(filtrate);

    }, [professore, materie]);

    const tuttiCampiCompilati = data && inizioLezione && fineLezione && idMateria && descrizione;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registra nuova lezione</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {/* Data */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>1.</span>
                        Data della lezione
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />
                </Form.Group>

                {/* Orario affiancato */}
                <div className="row g-2 mb-3">
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>2.</span>
                                Inizio
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={inizioLezione}
                                onChange={(e) => setInizioLezione(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>3.</span>
                                Fine
                            </Form.Label>
                            <Form.Control
                                type="time"
                                value={fineLezione}
                                onChange={(e) => setFineLezione(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                {/* Materia */}
                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>4.</span>
                        Materia
                    </Form.Label>
                    <Form.Select
                        value={idMateria}
                        onChange={(e) => setIdMateria(e.target.value)}
                    >
                        <option value="">Seleziona una materia</option>
                        {(materieProf.length > 0 ? materieProf : materie).map(m => (
                            <option key={m.idMateria} value={m.idMateria}>
                                {m.nome}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Descrizione */}
                <Form.Group className="mb-1">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>5.</span>
                        Descrizione
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Es. Spiegazione pag. 34-35, introduzione ai limiti..."
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                    />
                </Form.Group>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!tuttiCampiCompilati}
                >
                    Registra lezione
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleRegistraLezione;