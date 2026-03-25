import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";
import Dropdown from "react-bootstrap/Dropdown";

const IconaLoginAccount = () => {

    const { token, user, studente, genitore, figlioSelezionato } = useSelector((s) => s.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const getIniziali = () => {
        if (!user) return "";
        const n = user.nome?.charAt(0).toUpperCase() || "";
        const c = user.cognome?.charAt(0).toUpperCase() || "";
        return `${n}${c}`;
    };

    const getHomePath = () => {
        const ruolo = user?.ruolo?.ruolo;
        if (ruolo === "STUDENTE" && studente)
            return `/classe/${studente.classe.idClasse}/${studente.classe.nome}/studente/${studente.idStudente}`;
        if (ruolo === "GENITORE" && figlioSelezionato)
            return `/classe/${figlioSelezionato.idClasse}/${figlioSelezionato.classe}/studente/${figlioSelezionato.idStudente}`;
        if (ruolo === "GENITORE")
            return `/genitore/${user.idUser}`;
        if (ruolo === "PROFESSORE")
            return `/professore/${user.idUser}`;
        if (ruolo === "ADMIN")
            return `/ADMIN/${user.idUser}`;
        return "/";
    };

    if (!token || !user) {
        return (
            <div className="d-flex align-items-center">
                <Link to="/login" className="text-decoration-none d-flex align-items-center gap-2">
                    <i className="bi bi-person-circle fs-5" style={{ color: "#0ea5e9" }}></i>
                    <span className="testo-login">LOGIN</span>
                </Link>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center gap-3">

            <Dropdown align="end">
                <Dropdown.Toggle
                    as="span"
                    className="navbar-iniziali"
                    style={{ cursor: "pointer" }}
                    bsPrefix="no-caret"
                >
                    {getIniziali()}
                </Dropdown.Toggle>

                <Dropdown.Menu className="classe-dropdown-menu mt-2">

                    <div style={{ padding: "10px 16px 6px", borderBottom: "0.5px solid #e9ecef", marginBottom: "4px" }}>
                        <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>{user.nome} {user.cognome}</div>
                        <div style={{ fontSize: "0.78rem", color: "#6c757d" }}>{user.email}</div>
                    </div>

                    <Dropdown.Item
                        className="classe-dropdown-item"
                        onClick={() => navigate(getHomePath())}
                    >
                        <i className="bi bi-house me-2"></i>
                        La mia area
                    </Dropdown.Item>

                    <Dropdown.Item
                        as={Link}
                        to="/contatti"
                        className="classe-dropdown-item"
                    >
                        <i className="bi bi-envelope me-2"></i>
                        Contatti
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                        onClick={handleLogout}
                        className="classe-dropdown-item"
                        style={{ color: "#dc3545" }}
                    >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </Dropdown.Item>

                </Dropdown.Menu>
            </Dropdown>

        </div>
    );
};

export default IconaLoginAccount;