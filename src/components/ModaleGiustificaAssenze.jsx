import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModaleGiustificaAssenze = ({ show, handleClose }) => {
    return (
        <Modal
            show={show} onHide={handleClose} centered
        >
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Data assenza</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Motivo dell'assenza</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Annulla</Button>
                    <Button variant="primary"
                        onClick={() => {
                            handleClose();
                            alert("Assenza giustificata con successo!")
                        }}>Giustifica</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    );
}

export default ModaleGiustificaAssenze;