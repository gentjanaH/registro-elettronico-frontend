export const FETCH_STUDENTI_REQUEST = "FETCH_STUDENTI_REQUEST";
export const FETCH_STUDENTI_SUCCESS = "FETCH_STUDENTI_SUCCESS";
export const FETCH_STUDENTI_FAILURE = "FETCH_STUDENTI_FAILURE";

export const fetchStudentiByClasse = (idClasse) => {

    return (dispatch, getState) => {

        const token = getState().auth.token;
        if (!token) {
            console.error("TOKEN MANCANTE, BLOCCO LA FETCH");
            dispatch({
                type: FETCH_STUDENTI_FAILURE,
                payload: "Token di autenticazione mancante. Effettua il login."
            });
            return;
        }

        dispatch({ type: FETCH_STUDENTI_REQUEST });

        fetch(`http://localhost:8081/studenti/classe/${idClasse}`, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero degli studenti.");
                }
                return res.json();
            })
            .then((data) => {
                dispatch({
                    type: FETCH_STUDENTI_SUCCESS,
                    payload: data
                });
                console.log("Studenti: ", data)


            })
            .catch((err) => {
                dispatch({
                    type: FETCH_STUDENTI_FAILURE,
                    payload: err.message
                });
            });
    };
};