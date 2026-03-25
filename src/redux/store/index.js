import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../reducers/authReducer"
import classiReducer from "../reducers/classiReducer"
import studentiReducer from "../reducers/studentiReducer"
import lezioniReducers from "../reducers/lezioniReducers"
import compitiReducer from "../reducers/compitiReducer"
import presenzeReducer from "../reducers/presenzeReducer"
import valutazioniReducer from "../reducers/ValutazioniReducer"
import materieReducer from "../reducers/materieReducer"
import docenteReducer from "../reducers/docenteReducer"
import utentiReducer from "../reducers/utentiReducer"
import corsiExtraReducer from "../reducers/corsiExtraReducer"

const store = configureStore({

    reducer: {
        auth: authReducer,
        classi: classiReducer,
        studenti: studentiReducer,
        lezioni: lezioniReducers,
        compiti: compitiReducer,
        presenze: presenzeReducer,
        valutazioni: valutazioniReducer,
        materie: materieReducer,
        docenti: docenteReducer,
        utenti: utentiReducer,
        corsiExtra: corsiExtraReducer
    }


})

export default store