import { Col } from "react-bootstrap";

const Immaginecomponent = () => {

    return (
        <Col xs={12} lg={6} className="text-center align-content-center">

            <img
                style={{
                    width: "30em",
                    filter: "brightness(0) invert(1)",
                }}
                src="/OIP-removebg-preview.png"
                alt="Immagine" />
        </Col>


    );


}


export default Immaginecomponent;