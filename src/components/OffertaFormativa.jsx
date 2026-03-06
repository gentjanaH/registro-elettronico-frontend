import { Container, Row, Col, Card } from "react-bootstrap";

const OffertaFormativa = () => {
    return (
        <Container className="my-5">
            <h1 className="mb-4 text-light"> <span className="lettera-logo shadow-lg">Offerta </span> formativa</h1>
            <p className="lead text-black">
                Un percorso educativo completo, inclusivo e orientato alla crescita personale e culturale degli studenti.
            </p>
            <p className="lead text-black">
                La nostra offerta formativa è progettata per fornire agli studenti un'educazione di qualità,
                che promuova lo sviluppo delle competenze, la creatività e l'inclusione.
                <br />
                Offriamo un'ampia gamma di corsi curricolari e attività extracurriculari,
                laboratori innovativi e progetti speciali, per garantire un'esperienza scolastica stimolante e arricchente.
            </p>

            <h3 className="mt-5 text-light"> <span className="lettera-logo shadow-lg">Percorsi </span> di studio</h3>
            <p className="lead text-black">
                I nostri percorsi di studio sono progettati per offrire una formazione completa e orientata al futuro,
                che prepara gli studenti ad affrontare le sfide del mondo moderno.
                <br />
                Offriamo una vasta gamma di indirizzi, tra cui Liceo Scientifico, Liceo Classico, Liceo Linguistico, Istituto Tecnico e Istituto Professionale,
                con un'attenzione particolare all'innovazione didattica e alla personalizzazione dell'apprendimento.
            </p>



            <h3 className="mt-5 text-light"> <span className="lettera-logo shadow-lg">Progetti </span> speciali</h3>
            <p className="lead text-black">
                I nostri progetti speciali sono pensati per coinvolgere attivamente gli studenti in esperienze di apprendimento significative,
                che vanno oltre il curriculum tradizionale.
                <br />
                Attraverso questi progetti, gli studenti hanno l'opportunità di esplorare tematiche attuali,
                sviluppare competenze trasversali e collaborare con i compagni su iniziative che promuovono la consapevolezza sociale,
                ambientale e culturale.
            </p>
            <ul className="fs-5 lead text-info fw-bold">
                <li>Progetto Ambiente</li>
                <li>Progetto Legalità</li>
                <li>Progetto Lettura</li>
                <li>Progetto STEM</li>
                <li>Progetto Inclusione</li>
            </ul>
        </Container>
    );
};

export default OffertaFormativa;
