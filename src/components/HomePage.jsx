import { Col } from "react-bootstrap";
import CaroselloFunzionalita from "./CaroselloFunzionalita";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePage = () => {

    const { token, user } = useSelector((s) => s.auth);

    return (
        <>
            <Col xs={12} className="mb-0">
                <div className="offerta-hero">

                    <h1 className="offerta-titolo">
                        Benvenuto{token && user
                            ? `, ${user.nome} ${user.cognome}!`
                            : " nel registro elettronico!"}
                    </h1>

                    <p className="offerta-hero-sub">
                        Studiare, comunicare, crescere: tutto in un'unica piattaforma.
                    </p>

                    {!token && (
                        <p className="offerta-hero-sub">
                            <Link to="/login" className="offerta-hero-link">
                                Accedi
                            </Link>{" "}
                            per iniziare!
                        </p>
                    )}

                </div>
            </Col>

            <Col xs={12} className="text-center">
                <CaroselloFunzionalita />
            </Col>
        </>
    );
};

export default HomePage;