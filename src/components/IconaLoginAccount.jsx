import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const IconaLoginAccount = () => {

    const { token, user } = useSelector((s) => s.auth);
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

    if (!token || !user) {
        return (
            <Col className="d-flex align-items-center">
                <Link to="/login" className="text-decoration-none d-flex align-items-center gap-2">
                    <i className="bi bi-person-circle fs-5" style={{ color: "#0ea5e9" }}></i>
                    <span className="testo-login">LOGIN</span>
                </Link>
            </Col>
        );
    }

    return (
        <Col className="d-flex align-items-center gap-3">

            <span className="navbar-iniziali">{getIniziali()}</span>

            <div
                onClick={handleLogout}
                className="d-flex align-items-center gap-2 navbar-logout"
                style={{ cursor: "pointer" }}
            >
                <i className="bi bi-box-arrow-right fs-5" style={{ color: "#f87171" }}></i>
                <span className="testo-logout">LOGOUT</span>
            </div>

        </Col>
    );
};

export default IconaLoginAccount;