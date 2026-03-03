import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import IconeNavbar from "./IconeNavbar";
import { Link } from "react-router-dom";

const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Link className="navbar-brand" to="/">ClassBoard</Link>
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