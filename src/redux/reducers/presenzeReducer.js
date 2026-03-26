import {
    FETCH_PRESENZE_FAILURE,
    FETCH_PRESENZE_REQUEST,
    FETCH_PRESENZE_SUCCESS,
    GIUSTIFICA_ASSENZA_SUCCESS,
    GIUSTIFICA_ASSENZA_REQUEST,
    GIUSTIFICA_ASSENZA_FAILURE,
    REGISTRA_PRESENZE_FAILURE,
    REGISTRA_PRESENZE_REQUEST,
    REGISTRA_PRESENZE_SUCCESS
} from "../actions/presenzeActions";

const initialState = {
    presenze: [],
    loading: false,
    error: null
}

const presenzeReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case GIUSTIFICA_ASSENZA_REQUEST:
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

        case GIUSTIFICA_ASSENZA_FAILURE:
        case REGISTRA_PRESENZE_FAILURE:
        case FETCH_PRESENZE_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        case GIUSTIFICA_ASSENZA_SUCCESS:
            return {
                ...currentState,
                loading: false,
                presenze: currentState.presenze.map(p =>
                    p.idPresenza === action.payload.idPresenza ? {
                        ...p,
                        stato: action.payload.statoPresenza,
                        motivo: action.payload.motivo
                    } : p
                )
            };

        default:
            return currentState;
    }
}

export default presenzeReducer;