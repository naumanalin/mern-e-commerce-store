import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userApiSlice';
import adminReducer from './adminDashbaordSlice';
import cartReducer from './cartSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// individual persist configs
const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'], // only persist user slice
};

const adminPersistConfig = {
  key:"admin",
  storage,
  whitelist:['productList']
}

const cartPersistConfig = {
  key: 'cart',
  storage,
};

// combine reducers
const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  adminActions: adminReducer, // no need to persist adminActions
});

// configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


















// persist config
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['user'], // only persist user slice
// };
