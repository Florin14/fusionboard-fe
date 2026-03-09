import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./slices/uiSlice";
import languageReducer from "./slices/languageSlice";
import examsReducer from "./slices/examsSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    language: languageReducer,
    exams: examsReducer,
    // aici poți adăuga auth, users, etc
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


