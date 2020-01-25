import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { combineReducers } from 'redux';
import layoutsReducer from './_layouts/layoutsReducer';
import authReducer from './auth/authReducer';
import profileReducer from './profile/profileReducer';
import postReducer from './post/PostReducer';

const rootReducer = combineReducers({
  layoutsReducer,
  authReducer,
  profileReducer,
  postReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...[thunk])
  )
);

export default store;