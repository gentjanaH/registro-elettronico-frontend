import { DELETE_COMPITO_FAILURE, DELETE_COMPITO_REQUEST, DELETE_COMPITO_SUCCESS, FETCH_COMPITI_FAILURE, FETCH_COMPITI_REQUEST, FETCH_COMPITI_SUCCESS, REGISTRA_COMPITI_FAILURE, REGISTRA_COMPITI_REQUEST, REGISTRA_COMPITI_SUCCESS } from "../actions/compitiActions";

const initialState = {
    compiti: [],
    loading: false,
    error: null
}

const compitiReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case DELETE_COMPITO_REQUEST:
        case REGISTRA_COMPITI_REQUEST:
        case FETCH_COMPITI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case REGISTRA_COMPITI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                compiti: [...currentState.compiti, action.payload]
            };

        case FETCH_COMPITI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                compiti: action.payload.content
            };

        case DELETE_COMPITO_SUCCESS:
            return {
                ...currentState,
                loading: false,
                compiti: currentState.compiti.filter(c => c.idCompito !== action.payload)
            };

        case DELETE_COMPITO_FAILURE:
        case REGISTRA_COMPITI_FAILURE:
        case FETCH_COMPITI_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
}

export default compitiReducer;