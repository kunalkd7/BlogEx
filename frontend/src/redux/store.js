import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'

//reducers
import AuthReducer from './reducers/AuthReducer'
import BlogReducer from './reducers/BlogReducer'


const reducers = combineReducers({ AuthReducer, BlogReducer })
const middleware = [ReduxThunk] //for multiple middleware
const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))

export default store;