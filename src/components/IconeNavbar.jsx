import { Link } from "react-router-dom";

const IconeNavbar = () => {


    return (
        <div className="d-flex justify-content-end align-items-center w-50">
            <div className="d-flex justify-content-around w-25">
                <Link href="#" className="text-decoration-none text-dark d-flex me-3 align-items-center">
                    <i className="bi bi-person-circle me-2"></i>
                    <span>LOGIN</span></Link>
                <Link to="/register" className="text-decoration-none text-dark d-flex align-items-center">
                    <i className="bi bi-person-plus me-2"></i>
                    <span>REGISTRATI</span></Link>
            </div>
        </div>
    );
}

export default IconeNavbar;