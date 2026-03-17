import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { NotificationData, ActivityData } from "@/lib/websocket";

interface NotificationsState {
  notifications: NotificationData[];
  activities: ActivityData[];
  unreadCount: number;
  toastQueue: NotificationData[];
}

const initialState: NotificationsState = {
  notifications: [],
  activities: [],
  unreadCount: 0,
  toastQueue: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationData>) {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
      state.toastQueue.push(action.payload);
      // Keep last 50 notifications
      if (state.notifications.length > 50) {
        state.notifications = state.notifications.slice(0, 50);
      }
    },
    addActivity(state, action: PayloadAction<ActivityData>) {
      state.activities.unshift(action.payload);
      // Keep last 30 activities
      if (state.activities.length > 30) {
        state.activities = state.activities.slice(0, 30);
      }
    },
    markAllRead(state) {
      state.unreadCount = 0;
    },
    shiftToast(state) {
      state.toastQueue.shift();
    },
    clearNotifications(state) {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  addNotification,
  addActivity,
  markAllRead,
  shiftToast,
  clearNotifications,
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
