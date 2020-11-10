import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from '@redux-offline/redux-offline';
import defaultOfflineConfig from '@redux-offline/redux-offline/lib/defaults';
import thunk from 'redux-thunk';

import Reducers from '../reducers';
import Middlewares from "./middlewares";
import Reactotron from '../../config/reactotronConfig';
import customReduxOfflineConfig from '../../config/reduxOfflineConfig';

const composedStoreEnhancer = compose(
  applyMiddleware(thunk, ...Middlewares), 
  offline({ ...defaultOfflineConfig, ...customReduxOfflineConfig }),
  Reactotron.createEnhancer()
);

export const Store = createStore(Reducers, composedStoreEnhancer);