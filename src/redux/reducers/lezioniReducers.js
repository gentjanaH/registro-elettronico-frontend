import { DELETE_LEZIONE_SUCCESS, FETCH_LEZIONI_FAILURE, FETCH_LEZIONI_REQUEST, FETCH_LEZIONI_SUCCESS, REGISTRA_LEZIONE_FAILURE, REGISTRA_LEZIONE_REQUEST, REGISTRA_LEZIONE_SUCCESS } from "../actions/lezioniAction";


const initialState = {
    lezioni: [],
    loading: false,
    error: null
};


const lezioniReducers = (currentState = initialState, action) => {

    switch (action.type) {


        case REGISTRA_LEZIONE_REQUEST:
        case FETCH_LEZIONI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case FETCH_LEZIONI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                lezioni: action.payload
            };

        case REGISTRA_LEZIONE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                lezioni: [...currentState.lezioni, action.payload]
            };

        case DELETE_LEZIONE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                lezioni: currentState.lezioni.filter(l => l.idLezione !== action.payload)
            };

        case FETCH_LEZIONI_FAILURE:
        case REGISTRA_LEZIONE_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }

};

export default lezioniReducers;