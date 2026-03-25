import { ADD_FIGLIO_FAILURE, ADD_FIGLIO_REQUEST, ADD_FIGLIO_SUCCESS, REMOVE_FIGLIO_FAILURE, REMOVE_FIGLIO_REQUEST, REMOVE_FIGLIO_SUCCESS } from "../actions/genitoriActions";
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

        case ADD_FIGLIO_REQUEST:
        case REMOVE_FIGLIO_REQUEST:
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

        case ADD_FIGLIO_SUCCESS:
        case REMOVE_FIGLIO_SUCCESS:
            return {
                ...currentState,
                loading: false,
                genitori: currentState.genitori.map(g =>
                    g.idGenitore === action.payload.idGenitore ? action.payload : g
                )
            };

        case ADD_FIGLIO_FAILURE:
        case REMOVE_FIGLIO_FAILURE:
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