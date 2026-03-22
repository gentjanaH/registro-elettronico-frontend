import { Link } from "react-router-dom";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoSchoolOutline } from "react-icons/io5";

const IconeNavbar = ({ idStudente }) => {
    return (
        <div className="d-none d-lg-flex align-items-center gap-4">

            <Link to={`/assenze/${idStudente}`} className="navbar-icona-link">
                <HiOutlineCalendarDays className="navbar-icona-svg" />
                <span className="navbar-icona-label">Assenze</span>
            </Link>

            <Link to="/bacheca" className="navbar-icona-link">
                <HiOutlineClipboardDocumentList className="navbar-icona-svg" />
                <span className="navbar-icona-label">Bacheca</span>
            </Link>

            <Link to={`/voti/${idStudente}`} className="navbar-icona-link">
                <IoSchoolOutline className="navbar-icona-svg" />
                <span className="navbar-icona-label">Voti</span>
            </Link>

        </div>
    );
};

export default IconeNavbar;