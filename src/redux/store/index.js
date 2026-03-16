import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../reducers/authReducer"
import classiReducer from "../reducers/classiReducer"

const store = configureStore({

    reducer: {
        auth: authReducer,
        classi: classiReducer
    }


})

export default store