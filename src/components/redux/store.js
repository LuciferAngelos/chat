import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import { appReducer } from './appReducer';
import { usersReducer } from './usersReducer';


let reducers = combineReducers(
	{
		app: appReducer,
		users: usersReducer
	}
)


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;

export default store;
