export const ADD_FIGLIO_REQUEST = "ADD_FIGLIO_REQUEST";
export const ADD_FIGLIO_SUCCESS = "ADD_FIGLIO_SUCCESS";
export const ADD_FIGLIO_FAILURE = "ADD_FIGLIO_FAILURE";

export const REMOVE_FIGLIO_REQUEST = "REMOVE_FIGLIO_REQUEST";
export const REMOVE_FIGLIO_SUCCESS = "REMOVE_FIGLIO_SUCCESS";
export const REMOVE_FIGLIO_FAILURE = "REMOVE_FIGLIO_FAILURE";


export const addFiglio = (idGenitore, idStudente, onSuccess) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch({ type: ADD_FIGLIO_REQUEST });

        fetch(`http://localhost:8081/genitori/${idGenitore}/figli/${idStudente}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nell'aggiunta del figlio");
                return res.json();
            })
            .then(data => {
                dispatch({ type: ADD_FIGLIO_SUCCESS, payload: data });
                if (onSuccess) onSuccess();
            })
            .catch(err => dispatch({ type: ADD_FIGLIO_FAILURE, payload: err.message }));
    };
};


export const removeFiglio = (idGenitore, idStudente, onSuccess) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch({ type: REMOVE_FIGLIO_REQUEST });

        fetch(`http://localhost:8081/genitori/${idGenitore}/figli/${idStudente}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella rimozione del figlio");
                return res.json();
            })
            .then(data => {
                dispatch({ type: REMOVE_FIGLIO_SUCCESS, payload: data });
                if (onSuccess) onSuccess();
            })
            .catch(err => dispatch({ type: REMOVE_FIGLIO_FAILURE, payload: err.message }));
    };
};