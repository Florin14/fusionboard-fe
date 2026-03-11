import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import languageReducer from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
