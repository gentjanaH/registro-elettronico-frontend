export const FETCH_CORSI_EXTRA_REQUEST = "FETCH_CORSI_EXTRA_REQUEST";
export const FETCH_CORSI_EXTRA_SUCCESS = "FETCH_CORSI_EXTRA_SUCCESS";
export const FETCH_CORSI_EXTRA_FAILURE = "FETCH_CORSI_EXTRA_FAILURE";

export const ADD_CORSO_EXTRA_REQUEST = "ADD_CORSO_EXTRA_REQUEST";
export const ADD_CORSO_EXTRA_SUCCESS = "ADD_CORSO_EXTRA_SUCCESS";
export const ADD_CORSO_EXTRA_FAILURE = "ADD_CORSO_EXTRA_FAILURE";

export const ISCRIVI_STUDENTE_REQUEST = "ISCRIVI_STUDENTE_REQUEST";
export const ISCRIVI_STUDENTE_SUCCESS = "ISCRIVI_STUDENTE_SUCCESS";
export const ISCRIVI_STUDENTE_FAILURE = "ISCRIVI_STUDENTE_FAILURE";

export const DELETE_CORSO_EXTRA_REQUEST = "DELETE_CORSO_EXTRA_REQUEST";
export const DELETE_CORSO_EXTRA_SUCCESS = "DELETE_CORSO_EXTRA_SUCCESS";
export const DELETE_CORSO_EXTRA_FAILURE = "DELETE_CORSO_EXTRA_FAILURE";

export const fetchCorsiExtra = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch({ type: FETCH_CORSI_EXTRA_REQUEST });

        fetch("http://localhost:8081/corsi-extra-curricolari?page=0&size=100", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nel recupero dei corsi extra");
                return res.json();
            })
            .then(data => {
                console.log("Primo corso:", data.content[1]);
                dispatch({
                    type: FETCH_CORSI_EXTRA_SUCCESS,
                    payload: data.content
                });
            })
            .catch(err => dispatch({ type: FETCH_CORSI_EXTRA_FAILURE, payload: err.message }));
    };
};

export const addCorsoExtra = (payload, onSuccess) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch({ type: ADD_CORSO_EXTRA_REQUEST });

        fetch("http://localhost:8081/corsi-extra-curricolari", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella creazione del corso");
                return res.json();
            })
            .then(data => {
                dispatch({ type: ADD_CORSO_EXTRA_SUCCESS, payload: data });
                if (onSuccess) onSuccess();
            })
            .catch(err => dispatch({ type: ADD_CORSO_EXTRA_FAILURE, payload: err.message }));
    };
};


export const iscriviStudente = (idCorso, idStudente, onSuccess) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch({ type: ISCRIVI_STUDENTE_REQUEST });

        fetch(`http://localhost:8081/corsi-extra-curricolari/${idCorso}/studenti/${idStudente}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nell'iscrizione al corso");
                return res.json();
            })
            .then(data => {
                dispatch({ type: ISCRIVI_STUDENTE_SUCCESS, payload: data });
                if (onSuccess) onSuccess();
            })
            .catch(err => dispatch({ type: ISCRIVI_STUDENTE_FAILURE, payload: err.message }));
    };
};


export const deleteCorsoExtra = (idCorso) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch({ type: DELETE_CORSO_EXTRA_REQUEST });

        fetch(`http://localhost:8081/corsi-extra-curricolari/${idCorso}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nell'eliminazione del corso");
                dispatch({ type: DELETE_CORSO_EXTRA_SUCCESS, payload: idCorso });
            })
            .catch(err => dispatch({ type: DELETE_CORSO_EXTRA_FAILURE, payload: err.message }));
    };
};