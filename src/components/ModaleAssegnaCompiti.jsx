import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ModaleAssegnaCompiti = ({ show, handleClose }) => {
    // tramite l'api deve assegnare la classe, e l'id del professore 
    return (
        <Modal

            show={show} onHide={handleClose} centered
        >

            <Form className="p-3">
                <Form.Group controlId="dataNascita">
                    <Form.Label>Data di consegna prevista</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>
                <Form.Select aria-label="Default select example" className="my-2">

                    <option>Materia</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Titolo</Form.Label>
                    <Form.Control type="text" placeholder="Studiare, Completare esercizi, Verifica" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrizione del compito</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="massimo 100 caratteri" />
                </Form.Group>
            </Form>




            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Annulla</Button>
                <Button variant="primary"
                    onClick={() => {
                        handleClose();
                        alert("Compito aggiunto con successo con successo!")
                    }}>Assegna</Button>
            </Modal.Footer>

        </Modal>
    );
}

export default ModaleAssegnaCompiti;