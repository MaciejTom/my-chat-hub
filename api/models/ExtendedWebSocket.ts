export interface ExtendedWebSocket extends WebSocket {
    on(eventName: string, arg1: (message: MessageEvent) => void);
    username?: string;
    userId?: string;
  }
