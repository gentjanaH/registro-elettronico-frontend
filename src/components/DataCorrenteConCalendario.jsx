import { Col, Row } from "react-bootstrap";

const DataCorrenteConCalendario = () => {
    return (



        <h3 className="lettera-logo mb-4 fw-bold fs-2">
            {new Date().toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}
        </h3>



    );

}

export default DataCorrenteConCalendario;