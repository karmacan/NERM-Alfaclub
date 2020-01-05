import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import partialsReducer from './_partials/partialsReducer';

const rootReducer = combineReducers({
  partialsReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...[thunk])
  )
);

export default store;