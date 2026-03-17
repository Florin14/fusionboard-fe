import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import languageReducer from "./slices/languageSlice";
import notificationsReducer from "./slices/notificationsSlice";
import presenceReducer from "./slices/presenceSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    language: languageReducer,
    notifications: notificationsReducer,
    presence: presenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
