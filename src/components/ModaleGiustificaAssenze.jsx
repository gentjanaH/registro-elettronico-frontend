import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModaleGiustificaAssenze = ({ show, handleClose }) => {
    return (
        <Modal
            show={show} onHide={handleClose} centered
        >
            <Form className="p-2">


                <Modal.Title>Data assenza</Modal.Title>


                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Motivo dell'assenza</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="massimo 50 caratteri" />
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Annulla</Button>
                    <Button variant="primary"
                        onClick={() => {
                            handleClose();
                            alert("Assenza giustificata con successo!")
                        }}>Giustifica</Button>
                </Modal.Footer>

            </Form>
        </Modal>
    );
}

export default ModaleGiustificaAssenze;