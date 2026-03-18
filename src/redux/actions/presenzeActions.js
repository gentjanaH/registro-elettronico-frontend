export const FETCH_PRESENZE_REQUEST = "FETCH_PRESENZE_REQUEST";
export const FETCH_PRESENZE_SUCCESS = "FETCH_PRESENZE_SUCCESS";
export const FETCH_PRESENZE_FAILURE = "FETCH_PRESENZE_FAILURE";
export const REGISTRA_PRESENZE_REQUEST = "REGISTRA_PRESENZE_REQUEST";
export const REGISTRA_PRESENZE_SUCCESS = "REGISTRA_PRESENZE_SUCCESS";
export const REGISTRA_PRESENZE_FAILURE = "REGISTRA_PRESENZE_FAILURE";

export const registraPresenza = (idStudente, presenzaData) => {

    return (dispatch, getState) => {

        dispatch({ type: REGISTRA_PRESENZE_REQUEST });

        const token = getState().auth.token;



        fetch(`http://localhost:8081/presenze/studente/${idStudente}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(presenzaData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Errore nella registrazione della presenza dell'alunno");
                }
                return res.json();
            })
            .then(data => {
                dispatch({
                    type: REGISTRA_PRESENZE_SUCCESS,
                    payload: data
                });
                console.log("Presenza: ", data)
            })
            .catch(err => {
                dispatch({
                    type: REGISTRA_PRESENZE_FAILURE,
                    payload: err.message
                });
            });
    };
}

export const fetchPresenzeByStudent = (idStudente) => {

    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (!token) {
            console.error("TOKEN MANCANTE, BLOCCO LA FETCH");
            dispatch({
                type: FETCH_PRESENZE_FAILURE,
                payload: "Token di autenticazione mancante. Effettua il login."
            });
            return;
        }

        dispatch({ type: FETCH_PRESENZE_REQUEST });

        fetch(`http://localhost:8081/presenze/studente/${idStudente}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero delle presenze dell'alunno")
                }

                return res.json();
            })
            .then(data => {
                dispatch({
                    type: FETCH_PRESENZE_SUCCESS,
                    payload: data
                });
                console.log("Presenze: ", data)
            })
            .catch(err => {
                dispatch({
                    type: FETCH_PRESENZE_FAILURE,
                    payload: err.message
                });
            });

    }
}