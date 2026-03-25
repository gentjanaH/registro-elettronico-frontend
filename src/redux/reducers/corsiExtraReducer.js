import {
    FETCH_CORSI_EXTRA_REQUEST,
    FETCH_CORSI_EXTRA_SUCCESS,
    FETCH_CORSI_EXTRA_FAILURE,
    ADD_CORSO_EXTRA_REQUEST,
    ADD_CORSO_EXTRA_SUCCESS,
    ADD_CORSO_EXTRA_FAILURE,
    ISCRIVI_STUDENTE_REQUEST,
    ISCRIVI_STUDENTE_SUCCESS,
    ISCRIVI_STUDENTE_FAILURE,
    DELETE_CORSO_EXTRA_REQUEST,
    DELETE_CORSO_EXTRA_SUCCESS,
    DELETE_CORSO_EXTRA_FAILURE
} from "../actions/corsiExtraActions";

const initialState = {
    corsi: [],
    loading: false,
    error: null
};

const corsiExtraReducer = (currentState = initialState, action) => {
    switch (action.type) {

        case FETCH_CORSI_EXTRA_REQUEST:
        case ADD_CORSO_EXTRA_REQUEST:
        case ISCRIVI_STUDENTE_REQUEST:
        case DELETE_CORSO_EXTRA_REQUEST:
            return { ...currentState, loading: true, error: null };

        case FETCH_CORSI_EXTRA_SUCCESS:
            return { ...currentState, loading: false, corsi: action.payload };

        case ADD_CORSO_EXTRA_SUCCESS:
            return {
                ...currentState,
                loading: false,
                corsi: [...currentState.corsi, action.payload]
            };

        case ISCRIVI_STUDENTE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                corsi: currentState.corsi.map(c =>
                    c.idCorso === action.payload.idCorso ? action.payload : c
                )
            };

        case DELETE_CORSO_EXTRA_SUCCESS:
            return {
                ...currentState,
                loading: false,
                corsi: currentState.corsi.filter(c => c.idCorso !== action.payload)
            };

        case FETCH_CORSI_EXTRA_FAILURE:
        case ADD_CORSO_EXTRA_FAILURE:
        case ISCRIVI_STUDENTE_FAILURE:
        case DELETE_CORSO_EXTRA_FAILURE:
            return { ...currentState, loading: false, error: action.payload };

        default:
            return currentState;
    }
};

export default corsiExtraReducer;