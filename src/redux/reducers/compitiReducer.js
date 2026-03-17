import { FETCH_COMPITI_FAILURE, FETCH_COMPITI_REQUEST, FETCH_COMPITI_SUCCESS } from "../actions/compitiActions";

const initialState = {
    compiti: [],
    loading: false,
    error: null
}

const compitiReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case FETCH_COMPITI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case FETCH_COMPITI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                compiti: action.payload.content
            };

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