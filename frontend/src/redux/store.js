import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // SessionStorage persistence
import userReducer from "./slices/userSlice";

// Configuration object for redux-persist
const persistConfig = {
  key: "root",                    // Root key in storage
  storage: storageSession,        // Use sessionStorage instead of localStorage
};

// Apply persistence to the user reducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Configure Redux store with persisted reducer and middleware
export const store = configureStore({
  reducer: {
    user: persistedUserReducer,   // Only 'user' slice is persisted
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export persistor for use in <PersistGate>
export const persistor = persistStore(store);
