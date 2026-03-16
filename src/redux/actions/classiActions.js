export const FETCH_CLASSI_REQUEST = "FETCH_CLASSI_REQUEST";
export const FETCH_CLASSI_SUCCESS = "FETCH_CLASSI_SUCCESS";
export const FETCH_CLASSI_FAILURE = "FETCH_CLASSI_FAILURE";

export const fetchClassi = () => {

    const url = "http://localhost:8081/classi"

    return (dispatch, getState) => {

        dispatch({ type: FETCH_CLASSI_REQUEST });

        const token = getState().auth.token;

        fetch(url, {

            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Errore nel recupero delle classi.")
                }
            })

            .then((data) => {
                console.log("Classi: ", data)
                dispatch({
                    type: FETCH_CLASSI_SUCCESS,
                    payload: data,

                })

            })

            .catch((err) => {
                console.log(err)

                dispatch({
                    type: FETCH_CLASSI_FAILURE,
                    payload: err.message,
                })
            })
    }
}