export const FETCH_MATERIE_REQUEST = "FETCH_MATERIE_REQUEST";
export const FETCH_MATERIE_SUCCESS = "FETCH_MATERIE_SUCCESS";
export const FETCH_MATERIE_FAILURE = "FETCH_MATERIE_FAILURE";



export const fetchAllMaterie = () => {

    return (dispatch) => {


        dispatch({ type: FETCH_MATERIE_REQUEST });

        fetch(`http://localhost:8081/materie`)

            .then((res) => {
                if (!res.ok) {
                    throw new Error("Errore nel recupero delle materie")
                }

                return res.json();
            })
            .then(data => {
                dispatch({
                    type: FETCH_MATERIE_SUCCESS,
                    payload: data
                });
                console.log("Materie dalla get: ", data)
            })
            .catch(err => {
                dispatch({
                    type: FETCH_MATERIE_FAILURE,
                    payload: err.message
                });
            });

    }
}
