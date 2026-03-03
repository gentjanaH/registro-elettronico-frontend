import { Col, Row } from "react-bootstrap";
import CaroselloFunzionalita from "./CaroselloFunzionalita";

const HomePage = () => {
    return (
        <>
            <Col xs={12} lg={6} className="text-center">
                <h1>
                    Benvenuto nel registro elettronico!
                </h1>
                <p>
                    Qui potrai accedere a tutte le funzionalità, come visualizzare i voti, le assenze e le comunicazioni scolastiche.

                    Accedi o registrati per iniziare!

                </p>
            </Col>
            <Col xs={12} className="text-center">
                {/* carosello di card con tutte le funzionalità */}
                <CaroselloFunzionalita />
            </Col>

        </>
    );
}

export default HomePage;
