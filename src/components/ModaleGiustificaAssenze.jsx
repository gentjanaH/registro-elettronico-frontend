import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModaleGiustificaAssenze = ({ show, handleClose, motivo, setMotivo, onConfirm, data }) => {
    return (
        <Modal
            show={show} onHide={handleClose} centered
        >
            <Form className="p-2">


                <Modal.Title>Assenza del: {data}</Modal.Title>


                <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Motivo dell'assenza</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="massimo 50 caratteri"
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                    />
                </Form.Group>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Annulla</Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        Giustifica
                    </Button>
                </Modal.Footer>

            </Form>
        </Modal>
    );
}

export default ModaleGiustificaAssenze;