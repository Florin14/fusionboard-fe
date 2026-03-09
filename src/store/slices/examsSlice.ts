"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UpcomingExam {
  id: string;
  code: string;
  title: string;
  time: string;
  accent: string;
  badge: string;
}

interface ExamsState {
  upcomingExams: UpcomingExam[];
}

const initialState: ExamsState = {
  upcomingExams: [
    {
      id: "u1",
      code: "302",
      title: "Math Exam",
      time: "10 Feb - 7:30am to 9:00am",
      accent: "#E0E7FF",
      badge: "4 Days left",
    },
    {
      id: "u2",
      code: "303",
      title: "English Exam",
      time: "11 Feb - 7:30am to 9:00am",
      accent: "#D1FAE5",
      badge: "5 Days left",
    },
  ],
};

export const addExamAsync = createAsyncThunk(
  "exams/addExamAsync",
  async (exam: UpcomingExam) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return exam;
  }
);

const examsSlice = createSlice({
  name: "exams",
  initialState,
  reducers: {
    addExam(state, action: PayloadAction<UpcomingExam>) {
      state.upcomingExams.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addExamAsync.fulfilled, (state, action) => {
      state.upcomingExams.unshift(action.payload);
    });
  },
});

export const { addExam } = examsSlice.actions;
export default examsSlice.reducer;
