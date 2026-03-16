import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

const IconaLoginAccount = () => {

    const { token, user } = useSelector((currentState) => currentState.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch(logout());
        navigate("/");
    }

    const getIniziali = () => {

        if (!user) return "";
        const inizialeNome = user.nome?.charAt(0).toUpperCase() || "";
        const inizialeCognome = user.cognome?.charAt(0).toUpperCase() || "";
        return `${inizialeNome} ${inizialeCognome}`;

    }

    if (!token || !user) {

        return (

            <Col>
                <Link to="/login" className="text-decoration-none text-dark d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 fs-4 text-success"></i>

                    <span className="testo-login">LOGIN</span>
                </Link>
            </Col>
        );
    }
    return (
        <Col className="d-flex align-content-center">
            {/* se loggato iniziali nome e cognome, menù a tendina con account e LOGOUT */}
            <Button className="bg-transparent fs-4 mx-4 border-0">
                {getIniziali()}

            </Button>
            <div
                onClick={handleLogout}
                className="text-decoration-none text-dark d-flex align-items-center"
                style={{ cursor: "pointer" }}
            >



                <i className="bi bi-box-arrow-right me-2 fs-4 text-danger"></i>
                <span className="testo-login">LOGOUT</span>
            </div>
        </Col>
    );







}

export default IconaLoginAccount;