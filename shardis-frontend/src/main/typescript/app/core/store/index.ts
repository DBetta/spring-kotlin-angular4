import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';
import {ActionReducer, combineReducers} from '@ngrx/store';
import {CounterState} from './counter/counter.state';
import {environment} from '../../../environments/environment';
import {localStorageSync} from 'ngrx-store-localstorage';
import {routerReducer, RouterState} from '@ngrx/router-store';
import {counterReducer} from './counter/counter.reducer';
import {authReducer} from './auth/auth.reducer';
import {AuthState} from './auth/auth.state';


export interface RootState {
  auth: AuthState;
  counter: CounterState;
  router: RouterState;
}

const reducers = {
  auth: authReducer,
  counter: counterReducer,
  router: routerReducer
};

const developmentReducer: ActionReducer<RootState> = compose(
  storeFreeze,
  localStorageSync({keys: ['counter', 'router'], rehydrate: true, removeOnUndefined: true}),
  combineReducers)(reducers);

const productionReducer: ActionReducer<RootState> = compose(combineReducers)(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

