import { FETCH_CLASSI_FAILURE, FETCH_CLASSI_REQUEST, FETCH_CLASSI_SUCCESS } from "../actions/classiActions"

const initialState = {
    classi: [],
    loading: false,
    error: null
}


const classiReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case FETCH_CLASSI_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null
            };

        case FETCH_CLASSI_SUCCESS:
            return {
                ...currentState,
                loading: false,
                classi: action.payload
            };

        case FETCH_CLASSI_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload
            };

        default:
            return currentState;

    }



};

export default classiReducer;