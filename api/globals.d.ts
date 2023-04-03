import "ws"
import events from "events";

declare module "ws" {
    class _WS extends WebSocket { }
    export interface WebSocket extends _WS {
      username?: string;
      userId?: string;
    }
  }
// declare class WebSocket extends events.EventEmitter {
//   userId: string;
//   username: string;
// }