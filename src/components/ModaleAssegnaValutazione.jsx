import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { assegnaValutazione } from "../redux/actions/valutazioniActions";
import { useState } from "react";


const ModaleAssegnaValutazione = ({ show, handleClose, idStudente, idClasse }) => {

    const dispatch = useDispatch();


    const [lezione, setLezione] = useState("");
    const [valore, setValore] = useState("");
    const [tipo, setTipo] = useState("");

    const { lezioni } = useSelector(state => state.lezioni);
    const { professore } = useSelector(state => state.auth);

    // Lista unica di professori ricavata direttamente dalle lezioni
    const professoriMap = {};
    lezioni.forEach(lez => {
        if (!professoriMap[lez.idProfessore]) {
            professoriMap[lez.idProfessore] = {
                id: lez.idProfessore,
                nome: `${lez.nomeProfessore ?? ""} ${lez.cognomeProfessore}`.trim(),
            };
        }
    });


    // Lezioni filtrate per il professore selezionato
    const lezioniFiltrate = lezioni.filter(
        lez => String(lez.idProfessore) === String(professore?.idProfessore)
            && (!idClasse || String(lez.idClasse) === String(idClasse))
    );

    const lezioneSelezionata = lezioniFiltrate.find(
        l => String(l.idLezione) === String(lezione)
    );



    const handleReset = () => {

        setLezione("");
        setValore("");
        setTipo("");
    };

    const handleClose_ = () => {
        handleReset();
        handleClose();
    };

    const handleSubmit = () => {
        if (!lezione || !valore || !tipo) {
            alert("Compila tutti i campi");
            return;
        }

        const valutazioneData = {
            idLezione: lezione,
            valore: Number(valore),
            tipo: tipo.toUpperCase(),
        };

        dispatch(assegnaValutazione(idStudente, valutazioneData));
        alert("Voto salvato con successo!");
        handleClose_();
    };

    return (
        <Modal show={show} onHide={handleClose_} centered>
            <Modal.Header closeButton>
                <Modal.Title>Assegna Voto</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <Form.Group className="mb-3">
                    <Form.Label>
                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>1.</span>
                        Lezione
                    </Form.Label>

                    {lezioniFiltrate.length === 0 ? (
                        <div
                            className="text-muted text-center py-3"
                            style={{
                                border: "1px dashed #ced4da",
                                borderRadius: "8px",
                                fontSize: "0.9rem"
                            }}
                        >
                            Nessuna lezione trovata per questo professore
                        </div>
                    ) : (
                        <div
                            style={{
                                maxHeight: "200px",
                                overflowY: "auto",
                                border: "1px solid #ced4da",
                                borderRadius: "8px",
                                padding: "6px",
                                background: "#f8f9fa"
                            }}
                        >
                            {lezioniFiltrate.map(lez => {
                                const isSelected = String(lezione) === String(lez.idLezione);
                                return (
                                    <div
                                        key={lez.idLezione}
                                        onClick={() => setLezione(lez.idLezione)}
                                        style={{
                                            padding: "10px 12px",
                                            marginBottom: "5px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            backgroundColor: isSelected ? "#e7f1ff" : "white",
                                            border: isSelected ? "2px solid #0d6efd" : "1px solid #ddd",
                                            transition: "border 0.15s, background-color 0.15s",
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <strong style={{ fontSize: "0.92rem" }}>{lez.nomeMateria}</strong>
                                            <span className="text-muted" style={{ fontSize: "0.8rem" }}>{lez.data}</span>
                                        </div>
                                        {lez.descrizione && (
                                            <div className="text-muted" style={{ fontSize: "0.82rem", marginTop: "2px" }}>
                                                {lez.descrizione}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Form.Group>


                {/* Step 3 — Voto e Tipo (visibili solo dopo aver scelto la lezione) */}
                {lezione && (
                    <>
                        {/* Riepilogo lezione selezionata */}
                        {lezioneSelezionata && (
                            <div
                                className="mb-3 p-2 px-3"
                                style={{
                                    background: "#e7f1ff",
                                    border: "1px solid #b6d4fe",
                                    borderRadius: "8px",
                                    fontSize: "0.85rem"
                                }}
                            >
                                <span className="text-primary fw-bold">{lezioneSelezionata.nomeMateria}</span>
                                <span className="text-muted mx-1">—</span>
                                <span className="text-muted">{lezioneSelezionata.data}</span>
                            </div>
                        )}

                        <div className="row g-2">
                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>
                                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>2.</span>
                                        Voto
                                    </Form.Label>
                                    <Form.Select value={valore} onChange={(e) => setValore(e.target.value)}>
                                        <option value="">—</option>
                                        {[4, 5, 6, 7, 8, 9, 10].map(v => (
                                            <option key={v} value={v}>
                                                {v}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="col-6">
                                <Form.Group>
                                    <Form.Label>
                                        <span className="text-muted me-1" style={{ fontSize: "0.8rem" }}>3.</span>
                                        Tipo
                                    </Form.Label>
                                    <Form.Select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                        <option value="">—</option>
                                        <option value="ORALE">Orale</option>
                                        <option value="SCRITTO">Scritto</option>
                                        <option value="PRATICO">Pratico</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </>
                )}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose_}>
                    Annulla
                </Button>
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={!lezione || !valore || !tipo}
                >
                    Invia
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModaleAssegnaValutazione;
