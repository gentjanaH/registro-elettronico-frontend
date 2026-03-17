import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../reducers/authReducer"
import classiReducer from "../reducers/classiReducer"
import studentiReducer from "../reducers/studentiReducer"

const store = configureStore({

    reducer: {
        auth: authReducer,
        classi: classiReducer,
        studenti: studentiReducer
    }


})

export default store