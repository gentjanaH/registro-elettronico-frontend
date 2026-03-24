export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT = "LOGOUT";

export const SELEZIONA_FIGLIO = "SELEZIONA_FIGLIO";

export const REGISTRA_UTENTE_REQUEST = "REGISTRA_UTENTE_REQUEST";
export const REGISTRA_UTENTE_SUCCESS = "REGISTRA_UTENTE_SUCCESS";
export const REGISTRA_UTENTE_FAILURE = "REGISTRA_UTENTE_FAILURE";

export const logout = () => {

    return (dispatch) => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("studente");
        localStorage.removeItem("genitore");
        localStorage.removeItem("figlioSelezionato");
        dispatch({ type: LOGOUT });

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

                console.log("Dati login completi:", data);
                console.log("professore:", data.professore);
                console.log("chiavi disponibili:", Object.keys(data));
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: data,

                })
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("professore", JSON.stringify(data.professore));
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

export const register = (payload) => {

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
                console.log("Utente registrato:", data);
            })
            .catch(err => {
                dispatch({ type: REGISTRA_UTENTE_FAILURE, payload: err.message });

            });
    };
}