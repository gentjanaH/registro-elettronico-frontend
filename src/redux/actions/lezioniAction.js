export const REGISTRA_LEZIONE_REQUEST = "REGISTRA_LEZIONE_REQUEST";
export const REGISTRA_LEZIONE_SUCCESS = "REGISTRA_LEZIONE_SUCCESS";
export const REGISTRA_LEZIONE_FAILURE = "REGISTRA_LEZIONE_FAILURE";
export const FETCH_LEZIONI_REQUEST = "FETCH_LEZIONI_REQUEST";
export const FETCH_LEZIONI_SUCCESS = "FETCH_LEZIONI_SUCCESS";
export const FETCH_LEZIONI_FAILURE = "FETCH_LEZIONI_FAILURE";

export const registraLezione = (idClasse, lezioneData) => {

    return (dispatch, getState) => {

        dispatch({ type: REGISTRA_LEZIONE_REQUEST });

        const token = getState().auth.token;



        fetch(`http://localhost:8081/lezioni/classe/${idClasse}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(lezioneData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Errore nella registrazione della lezione");
                }
                return res.json();
            })
            .then(data => {
                dispatch({
                    type: REGISTRA_LEZIONE_SUCCESS,
                    payload: data
                });
                console.log("LEZIONE: ", data)
            })
            .catch(err => {
                dispatch({
                    type: REGISTRA_LEZIONE_FAILURE,
                    payload: err.message
                });
            });
    };


};


export const getLezioniByClass = (idClasse) => {
    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (!token) {
            console.error("TOKEN MANCANTE, BLOCCO LA FETCH");
            dispatch({
                type: FETCH_LEZIONI_FAILURE,
                payload: "Token di autenticazione mancante. Effettua il login."
            });
            return;
        }

        dispatch({ type: FETCH_LEZIONI_REQUEST });

        fetch(`http://localhost:8081/lezioni/classe/${idClasse}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero delle lezioni")
                }

                return res.json();
            })
            .then(data => {
                dispatch({
                    type: FETCH_LEZIONI_SUCCESS,
                    payload: data
                });
                console.log("Lezioni: ", data)
            })
            .catch(err => {
                dispatch({
                    type: FETCH_LEZIONI_FAILURE,
                    payload: err.message
                });
            });
    }


}