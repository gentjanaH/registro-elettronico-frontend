import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selezionaFiglio } from "../redux/actions/authActions";

const SelezioneProfiloFigli = () => {

    const { genitore } = useSelector(s => s.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const figli = genitore?.figli || [];

    const getIniziali = (nome, cognome) => {
        return `${nome?.charAt(0) || ""}${cognome?.charAt(0) || ""}`.toUpperCase();
    };

    return (
        <div className="seleziona-wrapper">

            <div className="seleziona-header">
                <h2 className="seleziona-titolo">Seleziona profilo</h2>
                <p className="seleziona-sub">Scegli il profilo dello studente che vuoi visualizzare</p>
            </div>

            <Row className="justify-content-center g-4">
                {figli.map(figlio => (
                    <Col key={figlio.idStudente} xs={12} sm={6} md={4} lg={3}>
                        <div className="figlio-card">

                            <div className="figlio-avatar">
                                {getIniziali(figlio.nome, figlio.cognome)}
                            </div>

                            <div className="figlio-nome">
                                {figlio.nome} {figlio.cognome}
                            </div>

                            <div className="figlio-classe">
                                Classe {figlio.classe}
                            </div>

                            <Button
                                className="figlio-btn"
                                onClick={() => {
                                    dispatch(selezionaFiglio(figlio));
                                    navigate(`/classe/${figlio.idClasse}/${figlio.classe}/studente/${figlio.idStudente}`);
                                }}
                            >
                                Accedi al profilo
                            </Button>

                        </div>
                    </Col>
                ))}
            </Row>

        </div>
    );
};

export default SelezioneProfiloFigli;