import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useNavigate, Link } from "react-router-dom";

const FormLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, user, token, genitore, studente } = useSelector((s) => s.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (token && user) {
            if (user.ruolo.ruolo === "STUDENTE" && studente) {
                const url = `/classe/${studente.classe.idClasse}/${studente.classe.nome}/studente/${studente.idStudente}`;
                console.log("Navigating to:", url);
                return navigate(url);
            }
            if (user.ruolo.ruolo === "GENITORE" && genitore)
                return navigate(`/genitore/${user.idUser}`);
            if (user.ruolo.ruolo === "PROFESSORE")
                return navigate(`/professore/${user.idUser}`);
            if (user.ruolo.ruolo === "ADMIN")
                return navigate(`/ADMIN/${user.idUser}`);
        }
    }, [token, user, studente, genitore, navigate]);

    return (
        <Row className="g-0 login-page-row">

            {/* ── Colonna sinistra: testo descrittivo ── */}
            <Col xs={12} lg={6} className="login-left d-flex flex-column justify-content-center px-5 py-5">
                <span className="login-badge mb-3">Piattaforma scolastica</span>
                <h1 className="login-headline mb-3">Benvenuto su ClassBoard</h1>
                <p className="login-description mb-4">
                    Il portale digitale che connette studenti, docenti e famiglie.
                    Accedi per gestire voti, comunicazioni e attività scolastiche
                    in un unico posto sicuro e sempre aggiornato.
                </p>
                <ul className="login-features list-unstyled">
                    <li>Visualizza voti e comunicazioni in tempo reale</li>
                    <li>Giustifica assenze e gestisci il registro</li>
                    <li>Corsi extra-curricolari sempre aggiornati</li>
                    <li>Area dedicata per genitori, studenti e docenti</li>
                </ul>
            </Col>

            {/* ── Colonna destra: form ── */}
            <Col xs={12} lg={6} className="login-right d-flex align-items-center justify-content-center px-4 py-5">
                <div className="login-form-card w-100">
                    <h2 className="login-form-title mb-1">Accedi al tuo account</h2>
                    <p className="login-form-sub mb-4">Inserisci le tue credenziali per continuare</p>

                    {error && <p className="text-danger small mb-3">{error}</p>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label className="login-label">Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="nome@esempio.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="login-input"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className="login-label">Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="login-input"
                            />
                        </Form.Group>

                        <Button
                            type="submit"
                            className="login-submit-btn w-100 mt-2"
                            disabled={loading}
                        >
                            {loading ? "Caricamento..." : "Accedi"}
                        </Button>
                    </Form>

                    <div className="login-divider my-3">
                        <span>oppure</span>
                    </div>

                    <p className="text-center login-register-text">
                        Non hai un account?{" "}
                        <Link to="/register" className="login-register-link">
                            Registrati
                        </Link>
                    </p>
                </div>
            </Col>
        </Row>
    );
};

export default FormLogin;