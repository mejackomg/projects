import { createStore, applyMiddleware, combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {layoutReducer } from '../reducers/layout';
import {dataReducer } from '../reducers/chartData';
import {databaseReducer } from '../reducers/database.js';
import {authReducer } from '../reducers/auth.js';


import ApiClient from '../utils/ApiClient';
import createMiddleware from './middleware/clientMiddleware';
const client = new ApiClient();

const logger = createLogger();
const reducer = combineReducers(
  {
    layoutReducer,
    authReducer,
    dataReducer,
    databaseReducer,
    //form: formReducer // mounted under "form"
  }
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  //logger,
  createMiddleware(client)
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}
