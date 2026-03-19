export const FETCH_VALUTAZIONI_REQUEST = "FETCH_VALUTAZIONI_REQUEST";
export const FETCH_VALUTAZIONI_SUCCESS = "FETCH_VALUTAZIONI_SUCCESS";
export const FETCH_VALUTAZIONI_FAILURE = "FETCH_VALUTAZIONI_FAILURE";
export const REGISTRA_VALUTAZIONI_REQUEST = "REGISTRA_VALUTAZIONI_REQUEST";
export const REGISTRA_VALUTAZIONI_SUCCESS = "REGISTRA_VALUTAZIONI_SUCCESS";
export const REGISTRA_VALUTAZIONI_FAILURE = "REGISTRA_VALUTAZIONI_FAILURE";

export const assegnaValutazione = (idStudente, valutazioneData) => {

    return (dispatch, getState) => {

        dispatch({ type: REGISTRA_VALUTAZIONI_REQUEST });

        const token = getState().auth.token;
        if (!token) {
            console.error("TOKEN MANCANTE, BLOCCO LA FETCH");
            dispatch({
                type: FETCH_VALUTAZIONI_FAILURE,
                payload: "Token di autenticazione mancante. Effettua il login."
            });
            return;
        }


        const url = `http://localhost:8081/valutazioni/studente/${idStudente}`;
        console.log("Invio valutazione", url, valutazioneData, "token", token);

        fetch(url, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(valutazioneData)
        })
            .then(async (res) => {
                if (!res.ok) {
                    const text = await res.text();
                    console.error("Errore POST valutazioni", res.status, text);
                    throw new Error(`Errore nella registrazione del voto (${res.status}): ${text}`);
                }
                return res.json();
            })
            .then(data => {
                dispatch({
                    type: REGISTRA_VALUTAZIONI_SUCCESS,
                    payload: data
                });
                console.log("Valutazione: ", data)
            })
            .catch(err => {
                dispatch({
                    type: REGISTRA_VALUTAZIONI_FAILURE,
                    payload: err.message
                });
            });
    };
}