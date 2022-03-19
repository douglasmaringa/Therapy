import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from "../slices/TherapistAuth"


const reducer = combineReducers({
  user,
 
})

const store = configureStore({
  reducer,    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;