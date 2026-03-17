import { FETCH_STUDENTI_REQUEST, FETCH_STUDENTI_SUCCESS, FETCH_STUDENTI_FAILURE } from "../actions/studentiActions";


const initialState = {
    studenti: [],
    loading: false,
    error: null
};

const studentiReducer = (currentState = initialState, action) => {
    switch (action.type) {
        case FETCH_STUDENTI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case FETCH_STUDENTI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                studenti: action.payload
            };

        case FETCH_STUDENTI_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;
    }
};

export default studentiReducer;