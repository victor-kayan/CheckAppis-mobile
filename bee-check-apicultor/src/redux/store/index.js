import { createStore, applyMiddleware } from 'redux';
import { Reducers } from '../reducers';
import thunk from 'redux-thunk';
import Middlewares from "./middlewares";

export const Store = createStore(Reducers, applyMiddleware(thunk, ...Middlewares));