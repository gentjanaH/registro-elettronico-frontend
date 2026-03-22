const corsi = [
    {
        nome: "Laboratorio di Coding e Robotica",
        desc: "Programmazione, Arduino e pensiero computazionale per esplorare il mondo digitale.",
        icona: "bi-cpu",
    },
    {
        nome: "Teatro e Espressione Creativa",
        desc: "Recitazione, improvvisazione e scrittura scenica per sviluppare creatività e comunicazione.",
        icona: "bi-mask",
    },
    {
        nome: "Giornalino Scolastico",
        desc: "Redazione, fotografia e impaginazione per raccontare la vita scolastica.",
        icona: "bi-newspaper",
    },
    {
        nome: "Laboratorio Musicale",
        desc: "Strumenti, teoria musicale e musica d'insieme per avvicinarsi al mondo della musica.",
        icona: "bi-music-note-beamed",
    },
    {
        nome: "Sport e Benessere",
        desc: "Attività motorie, giochi di squadra e educazione alla salute per il benessere psicofisico.",
        icona: "bi-trophy",
    },
];

const CorsiExtra = () => {
    return (
        <div className="offerta-wrapper">

            {/* ── Hero ── */}
            <div className="offerta-hero">
                <span className="login-badge mb-3">Attività extra-curricolari</span>
                <h1 className="offerta-titolo">Corsi extra</h1>
                <p className="offerta-hero-sub">
                    Scopri i nostri laboratori e attività extra per arricchire
                    la tua esperienza scolastica oltre il curriculum tradizionale.
                </p>
            </div>

            <div className="offerta-container">

                <p className="offerta-intro">
                    Le attività extra-curricolari sono pensate per stimolare
                    curiosità, creatività e spirito di squadra. Ogni corso è
                    aperto a tutti gli studenti indipendentemente dall'indirizzo.
                </p>

                <section className="offerta-section">
                    <h2 className="offerta-section-titolo">
                        <span className="offerta-accent">Laboratori</span> e attività
                    </h2>

                    <div className="corsi-grid mt-3">
                        {corsi.map((c) => (
                            <div key={c.nome} className="corso-card">
                                <div className="corso-icona-wrap">
                                    <i className={`bi ${c.icona} corso-icona`}></i>
                                </div>
                                <div className="corso-body">
                                    <div className="corso-nome">{c.nome}</div>
                                    <div className="corso-desc">{c.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default CorsiExtra;