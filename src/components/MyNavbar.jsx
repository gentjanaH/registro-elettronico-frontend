import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import IconeNavbar from "./IconeNavbar";
import IconaLoginAccount from "./IconaLoginAccount";
import { useDispatch, useSelector } from "react-redux";
import { selezionaFiglio } from "../redux/actions/authActions";

const MyNavbar = () => {
    const { token, user, figlioSelezionato, genitore } = useSelector((s) => s.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const figli = genitore?.figli || [];

    const ruolo = user?.ruolo?.ruolo;

    let idStudente = null;
    if (ruolo === "STUDENTE") idStudente = user?.studente?.idStudente;
    if (ruolo === "GENITORE") idStudente = figlioSelezionato?.idStudente;

    const mostraIcone = ruolo === "STUDENTE" || (ruolo === "GENITORE" && !!figlioSelezionato);

    return (
        <Navbar expand="lg" className="myNavbar sticky-top" collapseOnSelect>
            <Container fluid className="px-4">

                {/* Brand */}
                <Link className="navbar-brand me-auto" to="/">
                    <span className="lettera-logo">C</span>lass
                    <span className="lettera-logo">B</span>oard
                </Link>

                {/* Icone centrali (solo studente/genitore) */}
                {token && mostraIcone && (
                    <>
                        <Dropdown className="ms-5 ">
                            <Dropdown.Toggle className="navbar-iniziali" id="dropdown-basic">
                                {figlioSelezionato.nome} {figlioSelezionato.cognome}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="navbar-iniziali bg-body-secondary">
                                {figli.map(f => (

                                    <Dropdown.Item key={f.idStudente}
                                        className="mb-1"
                                        onClick={() => {
                                            dispatch(selezionaFiglio(f))
                                            navigate(
                                                `/classe/${f.idClasse}/${f.classe}/studente/${f.idStudente}`
                                            )
                                        }

                                        }
                                        href="#/action-1">{f.nome} {f.cognome}

                                    </Dropdown.Item>


                                ))}


                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="navbar-icone-center d-none d-lg-flex">
                            <IconeNavbar idStudente={idStudente} />
                        </div>
                    </>
                )}

                {/* Toggle mobile */}
                <Navbar.Toggle
                    aria-controls="navbar-main"
                    className="navbar-toggle-custom ms-auto me-2"
                />

                {/* Collapse */}
                <Navbar.Collapse id="navbar-main">
                    <Nav className="ms-auto d-flex align-items-lg-center gap-1">
                        <Link className="nav-link" to="/">Home</Link>
                        <Link className="nav-link" to="/offerta_formativa">Offerta formativa</Link>
                        <Link className="nav-link" to="/contatti">Contatti</Link>

                        {/* Su mobile: link testuali al posto delle icone */}
                        {token && mostraIcone && (
                            <div className="d-flex flex-column d-lg-none">
                                <Link className="nav-link" to={`/assenze/${idStudente}`}>Assenze</Link>
                                <Link className="nav-link" to="/bacheca">Bacheca</Link>
                                <Link className="nav-link" to={`/voti/${idStudente}`}>Voti</Link>
                            </div>
                        )}

                        <IconaLoginAccount />
                    </Nav>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
};

export default MyNavbar;