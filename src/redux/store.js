import { configureStore } from "@reduxjs/toolkit";
import { transactionsReducer } from "./transactions/transactionsSlice";
import storage from "redux-persist/lib/storage";
import { default as authReducer } from "./auth/slice";
import { reportsReducer } from "./reports/reportsSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { userReducer } from "./user/slice";
import modalReducer from "./modal/modalSlice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    transactions: transactionsReducer,
    user: userReducer,
    reports: reportsReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
