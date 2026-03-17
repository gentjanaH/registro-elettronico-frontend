import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../reducers/authReducer"
import classiReducer from "../reducers/classiReducer"
import studentiReducer from "../reducers/studentiReducer"
import lezioniReducers from "../reducers/lezioniReducers"

const store = configureStore({

    reducer: {
        auth: authReducer,
        classi: classiReducer,
        studenti: studentiReducer,
        lezioni: lezioniReducers
    }


})

export default store