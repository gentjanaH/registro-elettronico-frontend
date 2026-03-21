export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const SELEZIONA_FIGLIO = "SELEZIONA_FIGLIO";

export const logout = (data) => {

    return (dispatch) => {

        localStorage.removeItem("token");
        dispatch({ type: LOGOUT });

        localStorage.setItem("studente", JSON.stringify(data.studente));
    }
}

export const login = (email, password) => {

    const url = "http://localhost:8081/auth/login"

    return (dispatch) => {

        dispatch({ type: LOGIN_REQUEST });

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

            .then((res) => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("Errore nella risposta del login")
                }
            })

            .then((data) => {
                console.log("Dati login: ", data)
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data,

                })
                localStorage.setItem("user", JSON.stringify(data.user));

                localStorage.setItem("token", data.accessToken)
                return data;
            })

            .catch((err) => {
                console.log(err)

                dispatch({
                    type: LOGIN_FAILURE,
                    payload: err.message,
                })
            })
    }

}

export const selezionaFiglio = (figlio) => {
    return (dispatch) => {
        localStorage.setItem("figlioSelezionato", JSON.stringify(figlio));
        dispatch({
            type: "SELEZIONA_FIGLIO",
            payload: figlio
        });
    };
};
