import { Container, Row, Col, Card } from "react-bootstrap";

const OffertaFormativa = () => {
    return (
        <Container className="my-5">
            <h1 className="mb-4">Offerta Formativa</h1>
            <p className="lead">
                Un percorso educativo completo, inclusivo e orientato alla crescita personale e culturale degli studenti.
            </p>





            <h3 className="mt-5">Progetti Speciali</h3>
            <ul>
                <li>Progetto Ambiente</li>
                <li>Progetto Legalità</li>
                <li>Progetto Lettura</li>
                <li>Progetto STEM</li>
                <li>Progetto Inclusione</li>
            </ul>
        </Container>
    );
};

export default OffertaFormativa;
