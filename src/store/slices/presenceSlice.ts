import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { OnlineUser } from "@/lib/websocket";

interface PresenceState {
  onlineUsers: OnlineUser[];
  count: number;
}

const initialState: PresenceState = {
  onlineUsers: [],
  count: 0,
};

const presenceSlice = createSlice({
  name: "presence",
  initialState,
  reducers: {
    setPresence(
      state,
      action: PayloadAction<{ onlineUsers: OnlineUser[]; count: number }>
    ) {
      state.onlineUsers = action.payload.onlineUsers;
      state.count = action.payload.count;
    },
  },
});

export const { setPresence } = presenceSlice.actions;
export default presenceSlice.reducer;
