import {
    FETCH_PROFESSORI_REQUEST,
    FETCH_PROFESSORI_SUCCESS,
    FETCH_PROFESSORI_FAILURE,
    ASSEGNA_MATERIE_REQUEST,
    ASSEGNA_MATERIE_SUCCESS,
    ASSEGNA_MATERIE_FAILURE
} from "../actions/docenteActions";

const initialState = {
    professori: [],
    loading: false,
    error: null
};

const docenteReducer = (currentState = initialState, action) => {
    switch (action.type) {

        case FETCH_PROFESSORI_REQUEST:
        case ASSEGNA_MATERIE_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case FETCH_PROFESSORI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                professori: action.payload.content
            };

        case ASSEGNA_MATERIE_SUCCESS:
            return {
                ...currentState,
                loading: false
            };

        case FETCH_PROFESSORI_FAILURE:
        case ASSEGNA_MATERIE_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
};

export default docenteReducer;