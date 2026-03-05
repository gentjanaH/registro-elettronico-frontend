import { Link } from "react-router-dom";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoSchoolOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { Row, Col } from "react-bootstrap";
const IconeNavbar = () => {


    return (
        <div className="d-flex ms-auto align-items-center">
            <div className="d-flex gap-3 flex-wrap">
                <Row className="d-flex align-content-center align-items-center">
                    <Col>
                        {/* icone da mostrae al login */}
                        {/* VOTI-BACHECA-CALENDARIO-ACCOUNT */}
                        <Link to="/bacheca" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                            <HiOutlineClipboardDocumentList size={30} />
                            <span className="testo-icone-navbar">Bacheca</span>
                        </Link>
                    </Col>

                    <Col>
                        <Link to="/voti" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                            <IoSchoolOutline size={30} />
                            {/* nell'area professori qui ci sara CLASSI, una volta selezionata la classe, ci sara la CLASSE SCELTA */}
                            <span className="testo-icone-navbar ">Voti</span>
                        </Link>
                    </Col>

                    <Col>
                        <Link to="/calendario" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                            <IoCalendarOutline size={30} />
                            <span className="testo-icone-navbar ">Calendario</span>
                        </Link>
                    </Col>

                    <Col>
                        <Link to="/login" className="text-decoration-none text-dark d-flex align-items-center">
                            <i className="bi bi-person-circle me-2 fs-4 text-success"></i>
                            {/* se loggato LOGOUT */}
                            <span>LOGIN</span>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/register" className="text-decoration-none text-dark d-flex align-items-center">
                            <i className="bi bi-person-plus me-2 fs-4 text-primary"></i>
                            {/* se non loggato REGISTRATI */}
                            <span>REGISTRATI</span>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default IconeNavbar;