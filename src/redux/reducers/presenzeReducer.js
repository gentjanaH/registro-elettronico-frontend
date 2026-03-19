import { FETCH_PRESENZE_FAILURE, FETCH_PRESENZE_REQUEST, FETCH_PRESENZE_SUCCESS, REGISTRA_PRESENZE_FAILURE, REGISTRA_PRESENZE_REQUEST, REGISTRA_PRESENZE_SUCCESS } from "../actions/presenzeActions";

const initialState = {
    presenze: [],
    loading: false,
    error: null
}

const presenzeReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case REGISTRA_PRESENZE_REQUEST:
        case FETCH_PRESENZE_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case REGISTRA_PRESENZE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                presenze: [...currentState.presenze.filter(p => p.data !== action.payload.data), action.payload]
            };

        case FETCH_PRESENZE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                presenze: action.payload.content
            };

        case REGISTRA_PRESENZE_FAILURE:
        case FETCH_PRESENZE_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
}

export default presenzeReducer;