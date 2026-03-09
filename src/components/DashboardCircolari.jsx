
import { Col, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


const DashboardCircolari = () => {
    return (
        <>
            <Col xs={12}>
                <Row className="justify-content-evenly">
                    <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                        <h4 className="lettera-logo fw-bold">Media valutazioni</h4>

                        <div style={{ width: 150 }}>
                            <CircularProgressbar
                                value={75}
                                text="75%"
                                strokeWidth={16}
                                styles={buildStyles({ textSize: "16px", pathColor: "#0d6efd", trailColor: "#d6d6d6", textColor: "#fff" })} />
                        </div>
                    </Col>

                    <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                        <h4 className="mt-4 mt-md-0 lettera-logo fw-bold">Media presenze</h4>
                        <div style={{ width: 150 }}>
                            <CircularProgressbar
                                value={90} text="90%"
                                strokeWidth={16}
                                styles={buildStyles({ textSize: "16px", pathColor: "#b327c5", trailColor: "#d6d6d6", textColor: "#fff" })} />
                        </div>
                    </Col>
                </Row>
            </Col>
        </>
    );
};

export default DashboardCircolari;
