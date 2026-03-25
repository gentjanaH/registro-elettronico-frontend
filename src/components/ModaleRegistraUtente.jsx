import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchAllMaterie } from "../redux/actions/materieActions";
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
    const { loading, error } = useSelector(s => s.utenti);

    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        if (!materie?.length) {
            dispatch(fetchAllMaterie());
        }
    }, []);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => setForm(defaultForm);

    const handleClose_ = () => {
        handleReset();
        handleClose();
    };

    const handleSubmit = () => {
        const { nome, cognome, dataDiNascita, email, password, ruolo } = form;
        if (!nome || !cognome || !dataDiNascita || !email || !password || !ruolo) {
            alert("Compila tutti i campi obbligatori.");
            return;
        }
        dispatch(registraUtente(form, handleClose_));
    };

    const campiBaseCompilati =
        form.nome && form.cognome && form.dataDiNascita &&
        form.email && form.password && form.ruolo;

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
                    />
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
                    />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label>
                        <span className="form-step-numero">6.</span>
                        Ruolo
                    </Form.Label>
                    <Form.Select
                        value={form.ruolo}
                        onChange={e => handleChange("ruolo", e.target.value)}
                    >
                        <option value="">Seleziona un ruolo</option>
                        {RUOLI.map(r => (
                            <option key={r} value={r}>{r.charAt(0) + r.slice(1).toLowerCase()}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                {/* Sezione ruolo-specifica */}
                {form.ruolo && (
                    <>
                        <hr className="my-3" />

                        {/* PROFESSORE — materie */}
                        <Form.Group className="mb-3">
                            <Form.Label className="d-flex align-items-center gap-2">
                                Materie insegnate
                                {form.ruolo !== "PROFESSORE" && (
                                    <span className="form-badge-na">
                                        non applicabile per {form.ruolo.charAt(0) + form.ruolo.slice(1).toLowerCase()}
                                    </span>
                                )}
                            </Form.Label>
                            <Form.Select
                                disabled={form.ruolo !== "PROFESSORE"}
                                value=""
                                onChange={e => {
                                    const val = e.target.value;
                                    if (!val) return;
                                    const current = form.idMaterie ?? [];
                                    if (!current.includes(val)) {
                                        handleChange("idMaterie", [...current, val]);
                                    }
                                }}
                            >
                                <option value="">Aggiungi una materia</option>
                                {materie.map(m => (
                                    <option key={m.idMateria} value={m.idMateria}>{m.nome}</option>
                                ))}
                            </Form.Select>

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

                        {/* STUDENTE — classe */}
                        <Form.Group className="mb-1">
                            <Form.Label className="d-flex align-items-center gap-2">
                                ID Classe
                                {form.ruolo !== "STUDENTE" && (
                                    <span className="form-badge-na">
                                        non applicabile per {form.ruolo.charAt(0) + form.ruolo.slice(1).toLowerCase()}
                                    </span>
                                )}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="UUID della classe"
                                disabled={form.ruolo !== "STUDENTE"}
                                value={form.idClasse ?? ""}
                                onChange={e => handleChange("idClasse", e.target.value || null)}
                            />
                        </Form.Group>
                    </>
                )}

                {error && (
                    <div className="alert alert-danger mt-3 py-2 form-error">
                        {error}
                    </div>
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