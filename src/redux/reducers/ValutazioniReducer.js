import {
    FETCH_VALUTAZIONI_FAILURE,
    FETCH_VALUTAZIONI_REQUEST,
    FETCH_VALUTAZIONI_SUCCESS,
    REGISTRA_VALUTAZIONI_FAILURE,
    REGISTRA_VALUTAZIONI_REQUEST,
    REGISTRA_VALUTAZIONI_SUCCESS
} from "../actions/valutazioniActions";

const initialState = {
    valutazioni: [],
    loading: false,
    error: null
}

const valutazioniReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case REGISTRA_VALUTAZIONI_REQUEST:
        case FETCH_VALUTAZIONI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case REGISTRA_VALUTAZIONI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                valutazioni: [...currentState.valutazioni, action.payload]
            };

        case FETCH_VALUTAZIONI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                valutazioni: action.payload
            };

        case REGISTRA_VALUTAZIONI_FAILURE:
        case FETCH_VALUTAZIONI_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
}

export default valutazioniReducer;