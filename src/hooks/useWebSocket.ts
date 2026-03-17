"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { wsClient, WSMessage } from "@/lib/websocket";
import {
  addNotification,
  addActivity,
} from "@/store/slices/notificationsSlice";
import { setPresence } from "@/store/slices/presenceSlice";

export function useWebSocket(token: string | null) {
  const dispatch = useDispatch();
  const connectedRef = useRef(false);

  useEffect(() => {
    if (!token || connectedRef.current) return;

    wsClient.connect(token);
    connectedRef.current = true;

    const unsubscribe = wsClient.subscribe((message: WSMessage) => {
      switch (message.type) {
        case "notification":
          dispatch(addNotification(message.data));
          break;
        case "presence":
          dispatch(setPresence(message.data));
          break;
        case "activity":
          dispatch(addActivity(message.data));
          break;
      }
    });

    return () => {
      unsubscribe();
      wsClient.disconnect();
      connectedRef.current = false;
    };
  }, [token, dispatch]);
}

export function usePageTracking(page: string) {
  useEffect(() => {
    wsClient.sendPageChange(page);
  }, [page]);
}
