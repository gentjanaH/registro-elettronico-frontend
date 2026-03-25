import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
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

                {/* ── Brand sinistra ── */}
                <Link className="navbar-brand" to="/">
                    <span className="lettera-logo">C</span>lass
                    <span className="lettera-logo">B</span>oard
                </Link>

                {/* ── Centro: dropdown figlio + icone (solo desktop) ── */}
                {token && mostraIcone && (
                    <div className="navbar-centro d-none d-lg-flex align-items-center gap-3">

                        {ruolo === "GENITORE" && figlioSelezionato && (
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="navbar-iniziali"
                                    id="dropdown-figli"
                                >
                                    {figlioSelezionato.nome} {figlioSelezionato.cognome}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="classe-dropdown-menu">
                                    {figli.map(f => (
                                        <Dropdown.Item
                                            key={f.idStudente}
                                            className="classe-dropdown-item"
                                            onClick={() => {
                                                dispatch(selezionaFiglio(f));
                                                navigate(`/classe/${f.idClasse}/${f.classe}/studente/${f.idStudente}`);
                                            }}
                                        >
                                            {f.nome} {f.cognome}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                        <IconeNavbar idStudente={idStudente} />
                    </div>
                )}

                {/* ── Toggle mobile ── */}
                <Navbar.Toggle
                    aria-controls="navbar-main"
                    className="navbar-toggle-custom ms-auto me-2"
                />

                {/* ── Destra: link + login ── */}
                <Navbar.Collapse id="navbar-main">
                    <Nav className="ms-auto d-flex align-items-lg-center gap-1">
                        {!token && (
                            <>
                                <Link className="nav-link" to="/">Home</Link>
                                <Link className="nav-link" to="/offerta_formativa">Offerta formativa</Link>
                                <Link className="nav-link" to="/contatti">Contatti</Link>
                            </>
                        )}


                        {/* Link mobile per studente/genitore */}
                        {token && mostraIcone && (
                            <div className="d-flex flex-column d-lg-none">
                                {ruolo === "GENITORE" && figlioSelezionato && (
                                    <div className="navbar-figlio-mobile">
                                        {figlioSelezionato.nome} {figlioSelezionato.cognome}
                                    </div>
                                )}
                                <Link className="nav-link" to={`/assenze/${idStudente}`}>Assenze</Link>
                                <Link className="nav-link" to="/bacheca">Bacheca</Link>
                                <Link className="nav-link" to={`/voti/${idStudente}`}>Voti</Link>
                                <Link className="nav-link" to="/corsi-extra">Corsi extra</Link>
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