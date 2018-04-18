/**
 *
 * 开发Store模块
 *
 */

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import {persistStore, autoRehydrate} from 'redux-persist';
import {LocalStorage} from 'redux-persist/storages';
import {composeWithDevTools} from 'redux-devtools-extension';

const configureStore = preloadedState => {
  const composeEnhancers = composeWithDevTools({});
  const store = createStore(
    rootReducer,
    preloadedState, 
    composeEnhancers(
      applyMiddleware(thunk, createLogger())
    )
  );
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  if (__SERVER__) {
    // const path = require('path');
    // const NodeStorage = require('redux-persist-storage-node').default;
    // persistStore(store, {
    //   keyPrefix: '',
    //   storage: new NodeStorage(path.resolve('./store.json'))
    // });
  } else {
    persistStore(store, {storage: LocalStorage});
  }
  return store;
};

export default configureStore;