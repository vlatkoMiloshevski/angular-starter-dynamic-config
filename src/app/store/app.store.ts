
import {
    combineReducers,
    createStore,
    AnyAction,
    applyMiddleware,
    Reducer,
    compose,
} from 'redux';

import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { NgRedux } from '@angular-redux/store';
import { Comparator, Selector } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAppState, stateReducer } from './store.reducer';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

const middlewares = [thunk];
if (!environment.production) {
    // const { reduxLogger } = logger;
    middlewares.push(logger);
}

const persistConfig: PersistConfig = {
    key: 'root',
    storage: sessionStorage,
};

export const rootReducer = combineReducers({
    state: stateReducer,
});
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}
export const persistedReducer: Reducer<IAppState, AnyAction> = persistReducer(
    persistConfig,
    rootReducer,
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(...middlewares))
);

persistStore(store);

@Injectable({ providedIn: 'root' })
export class AppStore {
    constructor(private redux: NgRedux<IAppState>) { }

    public select(selector?: Selector<IAppState, any>, comparator?: Comparator): Observable<any> {
        return this.redux.select(selector);
    }
}
