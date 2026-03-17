"use client";

import { useWebSocket } from "@/hooks/useWebSocket";
import NotificationToast from "./NotificationToast";

// For now, we use a token prop approach.
// In production, this would come from the auth system (cookies/context).
export default function WebSocketProvider({
  token,
}: {
  token: string | null;
}) {
  useWebSocket(token);

  return <NotificationToast />;
}
