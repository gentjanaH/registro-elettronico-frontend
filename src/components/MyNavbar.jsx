import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import IconeNavbar from "./IconeNavbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    // Il componente MyNavbar utilizza React-Bootstrap per creare una barra di navigazione responsive.
    // Il componente include un logo, link di navigazione e un'area per le icone di login/registrazione.
    // TODO: Aggiungere funzionalità di logout e gestione dell'autenticazione in futuro.
    // TODO: Impostare la navbar sticky-top per renderla sempre visibile durante lo scroll.
    // TODO:Impostare delle icone e dei link diversi a seconda del ruolo dell'utente (genitore, docente, studente, segreteria).
    return (
        <Navbar expand="lg" className="myNavbar">
            <Container fluid>
                <Link className="navbar-brand" to="/"><span className="lettera-logo">C</span>lass<span className="lettera-logo">B</span>oard</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/offerta_formativa">Offerta formativa</Link>
                        <Link className="nav-link" to="/contatti">Contatti</Link>


                    </Nav>
                    <IconeNavbar />
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}

export default MyNavbar;