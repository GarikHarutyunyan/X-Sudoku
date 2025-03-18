import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import CryptoJS from 'crypto-js';
import {persistReducer, persistStore} from 'redux-persist';
import {levelReducer} from './levelSlice';
import {userReducer} from './userSlice';

const encryptionKey: string = 'donttrytohack';

// Define the encryption and decryption functions
const encrypt = (data: any) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
const decrypt = (data: any) => {
  const bytes = CryptoJS.AES.decrypt(data, encryptionKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['level'],
  transforms: [
    {
      // Apply the encryption transform
      in: (state: any): string => encrypt(state),
      out: (state: string): any => decrypt(state),
    },
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  level: levelReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore persist actions
        ignoredPaths: ['register'], // Ensure paths like 'register' are ignored
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
