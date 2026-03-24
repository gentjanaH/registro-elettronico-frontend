import {
    REGISTRA_UTENTE_REQUEST,
    REGISTRA_UTENTE_SUCCESS,
    REGISTRA_UTENTE_FAILURE,
    FETCH_UTENTI_REQUEST,
    FETCH_UTENTI_SUCCESS,
    FETCH_UTENTI_FAILURE
} from "../actions/utentiActions";

const initialState = {
    professori: [],
    genitori: [],
    studenti: [],
    amministratori: [],
    utenteRegistrato: null,
    loading: false,
    error: null
};

const utentiReducer = (currentState = initialState, action) => {
    switch (action.type) {

        case REGISTRA_UTENTE_REQUEST:
        case FETCH_UTENTI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case REGISTRA_UTENTE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                utenteRegistrato: action.payload
            };

        case FETCH_UTENTI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                professori: action.payload.professori ?? [],
                genitori: action.payload.genitori ?? [],
                studenti: action.payload.studenti ?? [],
                amministratori: action.payload.amministratori ?? []
            };

        case REGISTRA_UTENTE_FAILURE:
        case FETCH_UTENTI_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
};

export default utentiReducer;