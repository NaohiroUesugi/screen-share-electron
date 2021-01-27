import { Store, combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  logHistorySlice,
  initialState as logHistoryState,
} from './slice/log-history-slice';
import { userSlice, initialState as userState } from './slice/user-slice';

const rootReducer = combineReducers({
  logHistory: logHistorySlice.reducer,
  user: userSlice.reducer,
});

const preloadedState = () => {
  return { logHistory: logHistoryState, user: userState };
};

export type StoreState = ReturnType<typeof preloadedState>;

export type ReduxStore = Store<StoreState>;

const createStore = () => {
  const middlewareList = [...getDefaultMiddleware()];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState(),
  });
};

export default createStore;
