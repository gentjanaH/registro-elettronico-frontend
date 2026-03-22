import { Col } from "react-bootstrap";

const Immaginecomponent = () => {

    return (
        <Col xs={12} lg={6} className="text-center align-content-center">

            <img
                style={{
                    maxwidth: "30em",
                    color: "rgba(26, 12, 160, 0.06)"
                }}
                src="/OIP-removebg-preview.png"
                alt="Immagine" />
        </Col>


    );


}


export default Immaginecomponent;