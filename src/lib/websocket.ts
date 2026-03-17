import { API_BASE } from "./api";

export type WSEventType = "notification" | "presence" | "activity" | "pong";

export interface WSMessage {
  type: WSEventType;
  data: any;
  timestamp: string;
}

export interface NotificationData {
  id: number;
  category: "football" | "system" | "platform";
  title: string;
  message: string;
  icon: string;
  color: string;
  meta: Record<string, any>;
  createdAt: string;
}

export interface PresenceData {
  onlineUsers: OnlineUser[];
  count: number;
}

export interface OnlineUser {
  userId: number;
  userName: string;
  currentPage: string;
  connectedAt: string;
}

export interface ActivityData {
  userName: string;
  action: string;
  target: string;
  icon: string;
  color: string;
  timestamp: string;
}

type MessageHandler = (message: WSMessage) => void;

class WebSocketClient {
  private ws: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private token: string | null = null;
  private _isConnected = false;

  get isConnected() {
    return this._isConnected;
  }

  connect(token: string) {
    this.token = token;
    this.reconnectAttempts = 0;
    this._connect();
  }

  private _connect() {
    if (!this.token) return;

    // Convert http(s) to ws(s)
    const wsBase = API_BASE.replace(/^http/, "ws");
    const url = `${wsBase}/ws?token=${this.token}`;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this._isConnected = true;
        this.reconnectAttempts = 0;
        console.log("[WS] Connected");
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WSMessage = JSON.parse(event.data);
          this.handlers.forEach((handler) => handler(message));
        } catch (e) {
          console.error("[WS] Parse error:", e);
        }
      };

      this.ws.onclose = (event) => {
        this._isConnected = false;
        console.log(`[WS] Disconnected (code: ${event.code})`);
        // Don't reconnect if closed intentionally or auth failed
        if (event.code !== 4001 && event.code !== 4003) {
          this._scheduleReconnect();
        }
      };

      this.ws.onerror = () => {
        this._isConnected = false;
      };
    } catch (e) {
      console.error("[WS] Connection error:", e);
      this._scheduleReconnect();
    }
  }

  private _scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("[WS] Max reconnect attempts reached");
      return;
    }
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    console.log(
      `[WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`
    );
    this.reconnectTimer = setTimeout(() => this._connect(), delay);
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.token = null;
    this.reconnectAttempts = this.maxReconnectAttempts; // Prevent reconnect
    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }
    this._isConnected = false;
  }

  subscribe(handler: MessageHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  sendPageChange(page: string) {
    this._send({ action: "page_change", page });
  }

  ping() {
    this._send({ action: "ping" });
  }

  private _send(data: Record<string, unknown>) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

export const wsClient = new WebSocketClient();
