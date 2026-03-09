import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  sidebarCollapsed: boolean;
  addExamOpen: boolean;
}

const initialState: UiState = {
  sidebarCollapsed: false,
  addExamOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
    },
    openAddExam(state) {
      state.addExamOpen = true;
    },
    closeAddExam(state) {
      state.addExamOpen = false;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, openAddExam, closeAddExam } = uiSlice.actions;
export default uiSlice.reducer;
