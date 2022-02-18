import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { PersistConfig } from 'redux-persist/es/types';
import * as UserReducer from './userReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const STORAGE_KEY_ROOT = 'kernify';
const STORAGE_PERSIST_PREFIX = 'persist';

const indexPersistConfig: PersistConfig<IAppState> = {
  key: STORAGE_PERSIST_PREFIX + STORAGE_KEY_ROOT,
  whitelist: ['userState'],
  storage: storage,
};

export interface IAppState {
  userState: UserReducer.IUserState;
}

const AppReducer = combineReducers({
  userState: UserReducer.reduce,
});

const IndexReducer = (state: any, action: any) => {
  if (action.type === 'USER_LOG_OUT') {
    localStorage.clear();
    return AppReducer(undefined, action);
  } else {
    return AppReducer(state, action);
  }
};

export default persistReducer(indexPersistConfig, IndexReducer);
