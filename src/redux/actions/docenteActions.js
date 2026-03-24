export const FETCH_PROFESSORI_REQUEST = "FETCH_PROFESSORI_REQUEST";
export const FETCH_PROFESSORI_SUCCESS = "FETCH_PROFESSORI_SUCCESS";
export const FETCH_PROFESSORI_FAILURE = "FETCH_PROFESSORI_FAILURE";

export const ASSEGNA_MATERIE_REQUEST = "ASSEGNA_MATERIE_REQUEST";
export const ASSEGNA_MATERIE_SUCCESS = "ASSEGNA_MATERIE_SUCCESS";
export const ASSEGNA_MATERIE_FAILURE = "ASSEGNA_MATERIE_FAILURE";


export const fetchAllProfessori = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        dispatch({ type: FETCH_PROFESSORI_REQUEST });

        fetch("http://localhost:8081/professori?page=0&size=100", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nel recupero dei professori");
                return res.json();
            })
            .then(data => {
                dispatch({ type: FETCH_PROFESSORI_SUCCESS, payload: data });
                console.log("Professori:", data);
            })
            .catch(err => {
                dispatch({ type: FETCH_PROFESSORI_FAILURE, payload: err.message });
            });
    };
};


export const assegnaMaterie = (idProfessore, idMaterie) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        dispatch({ type: ASSEGNA_MATERIE_REQUEST });

        fetch(`http://localhost:8081/professori/${idProfessore}/materie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(idMaterie)
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nell'assegnazione delle materie");
                return res.json();
            })
            .then(data => {
                dispatch({ type: ASSEGNA_MATERIE_SUCCESS, payload: data });
                console.log("Materie assegnate:", data);
            })
            .catch(err => {
                dispatch({ type: ASSEGNA_MATERIE_FAILURE, payload: err.message });
            });
    };
};