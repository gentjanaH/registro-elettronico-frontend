import {
    FETCH_MATERIE_FAILURE,
    FETCH_MATERIE_REQUEST,
    FETCH_MATERIE_SUCCESS
} from "../actions/materieActions";

const initialState = {
    materie: [],
    loading: false,
    error: null
}

const materieReducer = (currentState = initialState, action) => {

    switch (action.type) {


        case FETCH_MATERIE_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case FETCH_MATERIE_SUCCESS:
            return {
                ...currentState,
                loading: false,
                materie: action.payload.content
            };


        case FETCH_MATERIE_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
}

export default materieReducer;