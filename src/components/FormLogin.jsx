import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Immaginecomponent from "./ImmagineComponent";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";




const FormLogin = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { loading, error, token, user } = useSelector((currentState) => currentState.auth)


    // stati per email e password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (token && user) {

            if (user.ruolo.ruolo === "STUDENTE" && user.studente) {
                navigate(
                    `/classe/${user.studente.classe.idClasse}/${user.studente.classe.nome}/studente/${user.studente.idStudente}`
                );

                return;
            }

            if (user.ruolo.ruolo === "GENITORE" && user.genitore) {

                const primoFiglio = user.genitore.figli[0];
                navigate(
                    `/classe/${primoFiglio.classe.idClasse}/${primoFiglio.classe.nome}/studente/${primoFiglio.idStudente}`
                );
                return;
            }


            if (user.ruolo.ruolo === "PROFESSORE") {
                navigate(`/professore/${user.idUser}`);

                return;
            }
        }
    }, [token, user, navigate]);

    return (

        <Row>
            <Col xs={12} lg={6} className="d-flex  justify-content-center ">
                <Form className="w-50 align-content-center " onSubmit={handleSubmit}>

                    {error && <p className="text-danger">{error}</p>}

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 " controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </Form.Group>

                    <Button variant="primary" type="submit" className="add-child-button my-3" disabled={loading}>
                        {loading ? "Loading..." : "Submit"}
                    </Button>
                </Form>
            </Col>
            <Immaginecomponent />
        </Row>




    );

}

export default FormLogin;