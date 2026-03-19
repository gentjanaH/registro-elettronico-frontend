import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import IconeNavbar from "./IconeNavbar";
import IconaLoginAccount from "./IconaLoginAccount";
import { useSelector } from "react-redux";

const MyNavbar = () => {
    const { token, user } = useSelector((currentState) => currentState.auth)



    const ruolo = user?.ruolo?.ruolo;

    let idStudente = null;

    if (ruolo === "STUDENTE") {
        idStudente = user?.studente?.idStudente;
    }

    if (ruolo === "GENITORE") {

        idStudente = user?.genitore?.studente?.idStudente;

    }

    const mostraIcone = ruolo === "STUDENTE" || ruolo === "GENITORE";

    // TODO: Impostare la navbar sticky-top per renderla sempre visibile durante lo scroll.
    // TODO:Impostare delle icone e dei link diversi a seconda del ruolo dell'utente (genitore, docente, studente, segreteria).
    return (
        <Navbar expand="lg" className="myNavbar">
            <Container fluid>
                <Row className="w-100 d-flex align-items-center justify-content-between ">
                    <Col xs={3} lg={4}>
                        <Link className="navbar-brand" to="/"><span className="lettera-logo">C</span>lass<span className="lettera-logo">B</span>oard</Link>
                    </Col>
                    {token && mostraIcone && (
                        <>
                            <Col xs={6} lg={4}>
                                <IconeNavbar idStudente={idStudente} />
                            </Col>
                        </>)}
                    <Col xs={3} lg={4}>

                        <Navbar.Toggle aria-controls="basic-navbar-nav flex-wrap align-items-center" />
                        <Navbar.Collapse id="basic-navbar-nav flex-wrap align-items-center">
                            <Nav className="me-auto">
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/offerta_formativa">Offerta formativa</Link>
                                <Link className="nav-link" to="/contatti">Contatti</Link>

                                <IconaLoginAccount />
                            </Nav>

                        </Navbar.Collapse>
                    </Col>

                </Row>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;