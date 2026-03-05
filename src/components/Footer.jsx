import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="myFooter text-dark py-4 text-center">
            <>

                <Row className="mb-2">
                    <Col xs={12}>
                        <small>Copyright © {new Date().getFullYear()} ClassBoard Inc. Tutti i diritti riservati.</small>
                    </Col>
                </Row>
            </>
        </footer >
    );
};

export default Footer;