import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './ducks';

const initialState = {};
const middleware = [thunk];

const store = createStore(
  combineReducers(reducers),
  initialState,
  compose(
    applyMiddleware(...middleware)
    // Comment next line to enable for production
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
