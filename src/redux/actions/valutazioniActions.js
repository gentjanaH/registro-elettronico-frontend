export const FETCH_VALUTAZIONI_REQUEST = "FETCH_VALUTAZIONI_REQUEST";
export const FETCH_VALUTAZIONI_SUCCESS = "FETCH_VALUTAZIONI_SUCCESS";
export const FETCH_VALUTAZIONI_FAILURE = "FETCH_VALUTAZIONI_FAILURE";
export const REGISTRA_VALUTAZIONI_REQUEST = "REGISTRA_VALUTAZIONI_REQUEST";
export const REGISTRA_VALUTAZIONI_SUCCESS = "REGISTRA_VALUTAZIONI_SUCCESS";
export const REGISTRA_VALUTAZIONI_FAILURE = "REGISTRA_VALUTAZIONI_FAILURE";

export const assegnaValutazione = (idStudente, valutzioneData) => {

    return (dispatch, getState) => {

        dispatch({ type: REGISTRA_VALUTAZIONI_REQUEST });

        const token = getState().auth.token;



        fetch(`http://localhost:8081/valutazioni/studente/${idStudente}`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(valutzioneData)
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Errore nella registrazione del voto");
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