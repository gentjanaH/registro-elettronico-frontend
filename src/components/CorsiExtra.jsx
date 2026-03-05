const CorsiExtra = () => {
    return (
        <div className="container mt-5">
            <h1 className="mb-4">Corsi Extra</h1>
            <p className="lead">
                Scopri i nostri corsi extra e arricchisci la tua esperienza scolastica.
            </p>
            {/* In seguito i corsi extra andranno aggiunte dinamicamente tramite API */}
            <h3 className="mt-5">Laboratori e Attività Extra</h3>
            <ul>
                <li>Laboratorio di Coding e Robotica</li>
                <li>Teatro e Espressione Creativa</li>
                <li>Giornalino Scolastico</li>
                <li>Laboratorio Musicale</li>
                <li>Sport e Benessere</li>
            </ul>
        </div>
    );
};

export default CorsiExtra;
