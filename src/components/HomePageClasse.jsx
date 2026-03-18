import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Compiti from "./Compiti";
import { Row, Col, ListGroup, Dropdown, Button } from "react-bootstrap";
import DataCorrenteConCalendario from "./DataCorrenteConCalendario";
import ModaleAssegnaCompiti from "./ModaleAssegnaCompiti";
import ModaleRegistraLezione from "./modaleRegistraLEzione";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentiByClasse } from "../redux/actions/studentiActions";
import { getLezioniByClass } from "../redux/actions/lezioniAction";
import { registraPresenza } from "../redux/actions/presenzeActions";
import Lezioni from "./Lezioni";
import { fetchCompitiByClass } from "../redux/actions/compitiActions";


const HomePageClasse = () => {

    // stato  e metodi per modale compiti
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // STATO E METODI PER IL MODALE CHE REGISTRA LA LEZIONE
    const [showLezione, setShowLezione] = useState(false);
    const openLezione = () => setShowLezione(true);
    const closeLezione = () => setShowLezione(false);


    // stato per la data
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [presenze, setPresenze] = useState({});

    const dispatch = useDispatch();

    const { idClasse, nomeClasse } = useParams();

    const token = useSelector(currentState => currentState.auth.token);

    const { studenti, loading, } = useSelector(currentState => currentState.studenti);

    // STATO LEZIONI
    const lezioni = useSelector(currentState => currentState.lezioni.lezioni)

    // TODO: qui devo recuperare l'id della lezione selezionata
    // ad esempio dalla lista lezioni del giorno

    // placeholder

    const recuperoLezioneAttiva = (selectedDay) => {
        if (!lezioni || lezioni.length === 0) return null;
        if (!selectedDay) return null;

        const today = new Date();
        const oggi = today.toISOString().split("T")[0];
        const selected = new Date(selectedDay).toISOString().split("T")[0];

        // Se la data selezionata non è oggi, non c'è lezione attiva
        if (selected !== oggi) return null;

        const now = today;
        const minutiCorrenti = now.getHours() * 60 + now.getMinutes();

        return (
            lezioni.find(lez => {
                if (lez.data !== oggi) return false;

                if (!lez.inizioLezione || !lez.fineLezione) return false;

                const [hInizio, mInizio] = lez.inizioLezione.split(":").map(Number);
                const [hFine, mFine] = lez.fineLezione.split(":").map(Number);

                const minutiInizio = hInizio * 60 + mInizio;
                const minutiFine = hFine * 60 + mFine;

                return minutiCorrenti >= minutiInizio && minutiCorrenti <= minutiFine;
            }) || null
        );
    };


    // FUNZIONE PER ASSEGNARE UNA PRESENZA/ASSENZA
    const handlePresenza = (idStudente, stato) => {
        const lezioneAttiva = recuperoLezioneAttiva(selectedDate);

        if (!lezioneAttiva) {
            console.log("nessuna lezione selezionata")
            alert("Registra prima la tua lezione per poter assegnare le assenze/presenze")
            return;
        }

        const presenzaData = {
            idLezione: lezioneAttiva.idLezione,
            stato: stato,
        }

        dispatch(registraPresenza(idStudente, presenzaData));
        setPresenze((prev) => ({
            ...prev,
            [idStudente]: stato
        }));
    }

    useEffect(() => {
        if (token) {
            dispatch(fetchStudentiByClasse(idClasse, nomeClasse));
            dispatch(getLezioniByClass(idClasse));
            dispatch(fetchCompitiByClass(idClasse));
        }

    }, [idClasse, token, nomeClasse, dispatch]);

    const lezioneAttiva = recuperoLezioneAttiva(selectedDate);

    return (
        <Row>
            <DataCorrenteConCalendario selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            {loading && <p>Caricamento studenti...</p>}
            <Col xs={12} className="d-flex align-items-start ms-5">
                <h2 className="lettera-logo mb-4 fw-bold fs-2 me-3">
                    {nomeClasse}
                </h2>
                {/* apère modale per rigistrare i compiti */}
                <Button
                    variant="success"
                    className="mx-3"
                    onClick={handleShow}>
                    Assegna Compiti
                </Button>
                <Button variant="primary" onClick={openLezione} >
                    Registra lezione
                </Button>
                <ModaleRegistraLezione show={showLezione} handleClose={closeLezione} />
                <ModaleAssegnaCompiti show={show} handleClose={handleClose} />
            </Col>



            <Col xs={12} md={6} className="d-flex flex-column align-items-center align-items-md-start ms-0 ms-md-5 ">
                <Lezioni selectedDate={selectedDate} onChangeDate={setSelectedDate} />
                <Compiti selectedDate={selectedDate} onChangeDate={setSelectedDate} />
            </Col>
            <Col>
                <Row>

                    <Col className="d-flex flex-column align-items-center mt-3 gap-2">
                        <h3 className="lettera-logo fw-bold">Lista studenti</h3>
                        {
                            studenti?.content?.map(stud => (
                                <>



                                    <Dropdown
                                        key={stud.idStudente}
                                        className="dropdown-card w-100">

                                        <Dropdown.Toggle variant="light"
                                            className="dropdown-card-toggle d-flex justify-content-between align-items-center w-100" >
                                            {stud.nome} {stud.cognome}
                                            <span
                                                className={
                                                    "d-inline-flex align-items-center justify-content-center rounded-circle " +
                                                    (!lezioneAttiva
                                                        ? "bg-secondary text-white"
                                                        : presenze[stud.idStudente] === "PRESENTE"
                                                            ? "bg-success text-white"
                                                            : presenze[stud.idStudente] === "ASSENTE"
                                                                ? "bg-danger text-white"
                                                                : "bg-secondary text-white")
                                                }
                                                style={{ width: 24, height: 24 }}
                                            >
                                                {!lezioneAttiva ? (
                                                    <i className="bi bi-question-circle"></i>
                                                ) : presenze[stud.idStudente] === "PRESENTE" ? (
                                                    <i className="bi bi-check-circle-fill"></i>
                                                ) : presenze[stud.idStudente] === "ASSENTE" ? (
                                                    <i className="bi bi-x-circle-fill"></i>
                                                ) : (
                                                    <i className="bi bi-question-circle"></i>
                                                )}
                                            </span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() =>
                                                handlePresenza(stud.idStudente, "PRESENTE")
                                            }>Presente</Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    handlePresenza(stud.idStudente, "ASSENTE")
                                                }>Assente</Dropdown.Item>
                                            <Dropdown.Item>Assegna voto</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </>
                            ))
                        }

                    </Col>

                </Row>


            </Col>

        </Row>
    );

}

export default HomePageClasse;