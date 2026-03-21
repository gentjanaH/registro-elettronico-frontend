import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SELEZIONA_FIGLIO } from "../actions/authActions";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    studente: JSON.parse(localStorage.getItem("studente")) || null,
    genitore: JSON.parse(localStorage.getItem("genitore")) || null,
    figlioSelezionato: JSON.parse(localStorage.getItem("figlioSelezionato")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null
};



const authReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...currentState,
                loading: false,
                token: action.payload.accessToken,
                user: action.payload.user,
                studente: action.payload.studente,
                genitore: action.payload.genitore,

            };

        case LOGOUT:
            return {
                ...currentState,
                token: null,
                user: null,
                loading: false,
                error: null
            };

        case SELEZIONA_FIGLIO:
            return {
                ...currentState,
                figlioSelezionato: action.payload
            };

        case LOGIN_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload,

            };


        default:
            return currentState

    }


};

export default authReducer;