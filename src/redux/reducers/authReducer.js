import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/authActions";

const initialState = {
    // stato iniziale del login
    user: null,
    token: null,
    loading: false,
    error: null,

}


const authReducer = (currentState = initialState, action) => {

    switch (action.type) {

        case LOGIN_REQUEST:
            return {
                ...currentState,
                loading: true,
                error: null,
            };

        case LOGIN_SUCCESS:
            return {
                ...currentState,
                loading: false,
                token: action.payload.accessToken,
                user: action.payload.user,

            };

        case LOGOUT:
            return {
                ...currentState,
                token: null,
                user: null,
                loading: false,
                error: null
            };

        case LOGIN_FAILURE:
            return {
                ...currentState,
                loading: false,
                error: action.payload,

            };


        default:
            return currentState

    }


};

export default authReducer;