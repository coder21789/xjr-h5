/**
 *
 * 发布Store模块
 *
 */

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import {LocalStorage} from 'redux-persist/storages';

const configureStore = preloadedState => {
    const store = createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(thunk)
            // autoRehydrate()
        )
    );
    if (__SERVER__) {
        const path = require('path');
        const NodeStorage = require('redux-persist-storage-node').default;
        persistStore(store, {
            keyPrefix: '',
            storage: new NodeStorage(path.resolve('./store.json'))
        });
    } else {
        persistStore(store, {storage: LocalStorage});
    }
    return store;
};

export default configureStore;