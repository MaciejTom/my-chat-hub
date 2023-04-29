export interface ExtendedWebSocket extends WebSocket {
  on(eventName: string, arg1: (message: MessageEvent) => void): void;
  username?: string;
  userId?: string;
  isAlive: boolean;
  timer: NodeJS.Timer;
  terminate(): unknown;
  deathTimer: NodeJS.Timeout;
  ping(): unknown;
}
