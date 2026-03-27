import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllMaterie } from "../redux/actions/materieActions";
import { fetchClassi } from "../redux/actions/classiActions";
import { registraUtente } from "../redux/actions/utentiActions";

const RUOLI = ["AMMINISTRATORE", "PROFESSORE", "GENITORE", "STUDENTE"];

const defaultForm = {
    nome: "",
    cognome: "",
    dataDiNascita: "",
    email: "",
    password: "",
    ruolo: "",
    idMaterie: null,
    idFiglio: null,
    idClasse: null
};

const ModaleRegistraUtente = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const { materie } = useSelector(s => s.materie);
    const { classi } = useSelector(s => s.classi);
    const { loading, error } = useSelector(s => s.utenti);

    const [form, setForm] = useState(defaultForm);
    const [alertMsg, setAlertMsg] = useState(null);
    const [alertVariant, setAlertVariant] = useState("danger");

    useEffect(() => {
        if (!materie?.length) dispatch(fetchAllMaterie());
        if (!classi?.content?.length) dispatch(fetchClassi());
    }, []);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => setForm(defaultForm);

    const handleClose_ = () => {
        handleReset();
        setAlertMsg(null);
        handleClose();
    };

    const handleSubmit = () => {
        const { nome, cognome, dataDiNascita, email, password, ruolo } = form;
        if (!nome || !cognome || !dataDiNascita || !email || !password || !ruolo) {
            setAlertMsg("Compila tutti i campi obbligatori prima di procedere.");
            setAlertVariant("danger");
            return;
        }
        dispatch(registraUtente(form, () => {
            setAlertMsg("Utente registrato con successo!");
            setAlertVariant("success");
            setTimeout(() => { setAlertMsg(null); handleClose_(); }, 1500);
        }));
    };

    const campiBaseCompilati =
        form.nome && form.cognome && form.dataDiNascita &&
        form.email && form.password && form.ruolo;

    const scrollList = {
        maxHeight: "200px",
        overflowY: "auto",
        border: "1px solid #ced4da",
        borderRadius: "8px",
        padding: "6px",
        background: "#f8f9fa"
    };

    const itemBase = (isSelected) => ({
        padding: "8px 12px",
        marginBottom: "4px",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: isSelected ? "#e7f1ff" : "white",
        border: isSelected ? "2px solid #0d6efd" : "1px solid #ddd",
        fontSize: "0.9rem",
        transition: "all 0.15s"
    });

    return (
        <Modal show={show} onHide={handleClose_} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Registra nuovo utente</Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 py-3">

                {/* Dati anagrafici */}
                <div className="row g-2 mb-3">
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="form-step-numero">1.</span>
                                Nome
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Giuseppe"
                                value={form.nome}
                                onChange={e => handleChange("nome", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-6">
                        <Form.Group>
                            <Form.Label>
                                <span className="form-step-numero">2.</span>
                                Cognome
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Rossi"
                                value={form.cognome}
                                onChange={e => handleChange("cognome", e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="form-step-numero">3.</span>
                        Data di nascita
                    </Form.Label>
                    <Form.Control
                        type="date"
                        value={form.dataDiNascita}
                        onChange={e => handleChange("dataDiNascita", e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                        placeholder="gg/mm/aaaa"
                    />
                    {form.dataDiNascita && (
                        <Form.Text className="form-hint">
                            {new Date(form.dataDiNascita).toLocaleDateString("it-IT", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="form-step-numero">4.</span>
                        Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="giuseppe@rossi.com"
                        value={form.email}
                        onChange={e => handleChange("email", e.target.value)}
                        autoComplete="off"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="form-step-numero">5.</span>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Min. 8 caratteri, maiuscola e simbolo"
                        value={form.password}
                        onChange={e => handleChange("password", e.target.value)}
                        autoComplete="new-password"
                    />
                </Form.Group>

                {/* Ruolo — lista scrollabile */}
                <Form.Group className="mb-4">
                    <Form.Label>
                        <span className="form-step-numero">6.</span>
                        Ruolo
                    </Form.Label>
                    <div style={scrollList}>
                        {RUOLI.map(r => (
                            <div
                                key={r}
                                onClick={() => handleChange("ruolo", r)}
                                style={itemBase(form.ruolo === r)}
                            >
                                {r.charAt(0) + r.slice(1).toLowerCase()}
                            </div>
                        ))}
                    </div>
                </Form.Group>

                {/* Sezione ruolo-specifica */}
                {form.ruolo && (
                    <>
                        <hr className="my-3" />

                        {/* PROFESSORE — materie scrollabili */}
                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex align-items-center gap-2">
                                Materie insegnate
                                {form.ruolo !== "PROFESSORE" && (
                                    <span className="form-badge-na">
                                        non applicabile per {form.ruolo.charAt(0) + form.ruolo.slice(1).toLowerCase()}
                                    </span>
                                )}
                            </Form.Label>

                            {form.ruolo === "PROFESSORE" ? (
                                <div style={scrollList}>
                                    {materie
                                        .filter(m => !(form.idMaterie ?? []).includes(String(m.idMateria)))
                                        .map(m => (
                                            <div
                                                key={m.idMateria}
                                                onClick={() => {
                                                    const current = form.idMaterie ?? [];
                                                    handleChange("idMaterie", [...current, String(m.idMateria)]);
                                                }}
                                                style={itemBase(false)}
                                                onMouseEnter={e => e.currentTarget.style.background = "#e7f1ff"}
                                                onMouseLeave={e => e.currentTarget.style.background = "white"}
                                            >
                                                {m.nome}
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <Form.Control disabled placeholder="Seleziona prima il ruolo Professore" />
                            )}

                            {form.idMaterie?.length > 0 && (
                                <div className="form-chips-wrapper">
                                    {form.idMaterie.map(id => {
                                        const m = materie.find(x => String(x.idMateria) === String(id));
                                        return (
                                            <span
                                                key={id}
                                                className="form-chip"
                                                onClick={() => handleChange("idMaterie", form.idMaterie.filter(x => x !== id))}
                                            >
                                                {m?.nome ?? id} ✕
                                            </span>
                                        );
                                    })}
                                </div>
                            )}
                        </Form.Group>

                        {/* GENITORE — figlio */}
                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex align-items-center gap-2">
                                ID Figlio
                                {form.ruolo !== "GENITORE" && (
                                    <span className="form-badge-na">
                                        non applicabile per {form.ruolo.charAt(0) + form.ruolo.slice(1).toLowerCase()}
                                    </span>
                                )}
                            </Form.Label>
                            <div className="d-flex gap-2">
                                <Form.Control
                                    type="text"
                                    id="inputFiglio"
                                    placeholder="UUID dello studente"
                                    disabled={form.ruolo !== "GENITORE"}
                                />
                                <Button
                                    variant="outline-primary"
                                    disabled={form.ruolo !== "GENITORE"}
                                    onClick={() => {
                                        const input = document.getElementById("inputFiglio");
                                        const val = input.value.trim();
                                        if (!val) return;
                                        const current = form.idFiglio ?? [];
                                        if (!current.includes(val)) {
                                            handleChange("idFiglio", [...current, val]);
                                        }
                                        input.value = "";
                                    }}
                                >
                                    Aggiungi
                                </Button>
                            </div>
                            <Form.Text className="form-hint">
                                Aggiungi uno o più figli
                            </Form.Text>

                            {form.idFiglio?.length > 0 && (
                                <div className="form-chips-wrapper">
                                    {form.idFiglio.map(id => (
                                        <span
                                            key={id}
                                            className="form-chip"
                                            onClick={() => handleChange("idFiglio", form.idFiglio.filter(x => x !== id))}
                                        >
                                            {id} ✕
                                        </span>
                                    ))}
                                </div>
                            )}
                        </Form.Group>

                        {/* STUDENTE — classe scrollabile */}
                        <Form.Group className="mb-1">
                            <Form.Label className="d-flex align-items-center gap-2">
                                Classe
                                {form.ruolo !== "STUDENTE" && (
                                    <span className="form-badge-na">
                                        non applicabile per {form.ruolo.charAt(0) + form.ruolo.slice(1).toLowerCase()}
                                    </span>
                                )}
                            </Form.Label>

                            {form.ruolo === "STUDENTE" ? (
                                <div style={scrollList}>
                                    {classi?.content?.map(c => (
                                        <div
                                            key={c.idClasse}
                                            onClick={() => handleChange("idClasse", c.idClasse)}
                                            style={itemBase(form.idClasse === c.idClasse)}
                                        >
                                            {c.nome}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <Form.Control disabled placeholder="Seleziona prima il ruolo Studente" />
                            )}

                            {form.idClasse && (
                                <div className="mt-2">
                                    <span className="form-chip">
                                        {classi?.content?.find(c => c.idClasse === form.idClasse)?.nome ?? form.idClasse} ✕
                                        <span
                                            style={{ marginLeft: "6px", cursor: "pointer" }}
                                            onClick={() => handleChange("idClasse", null)}
                                        >
                                        </span>
                                    </span>
                                </div>
                            )}
                        </Form.Group>
                    </>
                )}

                {error && (
                    <Alert variant="danger" className="mt-3 py-2" style={{ fontSize: "0.88rem" }}>
                        <i className="bi bi-exclamation-triangle me-2"></i>{error}
                    </Alert>
                )}

                {alertMsg && (
                    <Alert
                        variant={alertVariant}
                        onClose={() => setAlertMsg(null)}
                        dismissible
                        className="mt-3 py-2"
                        style={{ fontSize: "0.88rem" }}
                    >
                        {alertVariant === "success"
                            ? <><i className="bi bi-check-circle me-2"></i>{alertMsg}</>
                            : <><i className="bi bi-exclamation-triangle me-2"></i>{alertMsg}</>
                        }
                    </Alert>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose_}>
                    Annulla
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!campiBaseCompilati || loading}
                >
                    {loading ? "Registrazione..." : "Registra utente"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleRegistraUtente;