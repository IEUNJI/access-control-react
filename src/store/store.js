import { createStore, combineReducers } from 'redux'
import { authReducer } from './reducers.js'

const rootReducer = combineReducers({ authReducer })

export default createStore(rootReducer)
