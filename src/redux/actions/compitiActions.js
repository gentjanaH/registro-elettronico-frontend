export const FETCH_COMPITI_REQUEST = "FETCH_COMPITI_REQUEST";
export const FETCH_COMPITI_SUCCESS = "FETCH_COMPITI_SUCCESS";
export const FETCH_COMPITI_FAILURE = "FETCH_COMPITI_FAILURE";
export const REGISTRA_COMPITI_REQUEST = "REGISTRA_COMPITI_REQUEST";
export const REGISTRA_COMPITI_SUCCESS = "REGISTRA_COMPITI_SUCCESS";
export const REGISTRA_COMPITI_FAILURE = "REGISTRA_COMPITI_FAILURE";


export const registraCompito = (idClasse, compitoData) => {

    return (dispatch, getState) => {

        dispatch({ type: REGISTRA_COMPITI_REQUEST });

        const token = getState().auth.token;



        fetch(`http://localhost:8081/compiti/classe/${idClasse}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(compitoData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Errore nella registrazione del compito");
                }
                return res.json();
            })
            .then(data => {
                dispatch({
                    type: REGISTRA_COMPITI_SUCCESS,
                    payload: data
                });
                console.log("Compiti: ", data)
            })
            .catch(err => {
                dispatch({
                    type: REGISTRA_COMPITI_FAILURE,
                    payload: err.message
                });
            });
    };
}

export const fetchCompitiByClass = (idClasse) => {

    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (!token) {
            console.error("TOKEN MANCANTE, BLOCCO LA FETCH");
            dispatch({
                type: FETCH_COMPITI_FAILURE,
                payload: "Token di autenticazione mancante. Effettua il login."
            });
            return;
        }

        dispatch({ type: FETCH_COMPITI_REQUEST });

        fetch(`http://localhost:8081/compiti/classe/${idClasse}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero dei compiti")
                }

                return res.json();
            })
            .then(data => {
                dispatch({
                    type: FETCH_COMPITI_SUCCESS,
                    payload: data
                });
                console.log("Compiti: ", data)
            })
            .catch(err => {
                dispatch({
                    type: FETCH_COMPITI_FAILURE,
                    payload: err.message
                });
            });

    }
}