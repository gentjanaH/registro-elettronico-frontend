export const REGISTRA_UTENTE_REQUEST = "REGISTRA_UTENTE_REQUEST";
export const REGISTRA_UTENTE_SUCCESS = "REGISTRA_UTENTE_SUCCESS";
export const REGISTRA_UTENTE_FAILURE = "REGISTRA_UTENTE_FAILURE";

export const FETCH_UTENTI_REQUEST = "FETCH_UTENTI_REQUEST";
export const FETCH_UTENTI_SUCCESS = "FETCH_UTENTI_SUCCESS";
export const FETCH_UTENTI_FAILURE = "FETCH_UTENTI_FAILURE";


export const registraUtente = (payload, onSuccess) => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        dispatch({ type: REGISTRA_UTENTE_REQUEST });

        fetch("http://localhost:8081/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella registrazione dell'utente");
                return res.json();
            })
            .then(data => {
                dispatch({ type: REGISTRA_UTENTE_SUCCESS, payload: data });
                if (onSuccess) onSuccess();
            })
            .catch(err => {
                dispatch({ type: REGISTRA_UTENTE_FAILURE, payload: err.message });
            });
    };
};


export const fetchUtentiPerRuolo = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token;

        dispatch({ type: FETCH_UTENTI_REQUEST });

        fetch("http://localhost:8081/utenti/divisi-per-ruolo", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nel recupero degli utenti");
                return res.json();
            })
            .then(data => {
                dispatch({ type: FETCH_UTENTI_SUCCESS, payload: data });
                console.log("Utenti per ruolo:", data);
            })
            .catch(err => {
                dispatch({ type: FETCH_UTENTI_FAILURE, payload: err.message });
            });
    };
};