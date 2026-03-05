import { Col, Row } from "react-bootstrap";
import CaroselloFunzionalita from "./CaroselloFunzionalita";

const HomePage = () => {
    return (
        <>
            <Col xs={12} lg={6} className="text-center mt-5">
                <h1 className="titolo-home mb-4">
                    <span className="lettera-logo">Benvenuto</span> nel registro elettronico!
                </h1>
                <p className="fs-5">
                    Studiare, comunicare, crescere: tutto in un’unica piattaforma.</p>
                <p className="fs-5">

                    Accedi o registrati per iniziare!

                </p>
            </Col >
            <Col xs={12} className="text-center">
                {/* carosello di card con tutte le funzionalità */}
                <CaroselloFunzionalita />
            </Col>

        </>
    );
}

export default HomePage;
