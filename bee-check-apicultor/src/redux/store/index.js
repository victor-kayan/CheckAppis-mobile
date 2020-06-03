import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from 'redux-thunk';

import { Reducers } from '../reducers';
import Middlewares from "./middlewares";

const composedStoreEnhancer = compose(
  applyMiddleware(thunk, ...Middlewares), 
  offline(offlineConfig)
);

export const Store = createStore(Reducers, composedStoreEnhancer);