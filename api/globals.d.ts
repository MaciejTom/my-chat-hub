import * as ws from "ws"
// import "ws"
// declare module 'ws' {
//   export interface WebSocket extends ws {
//     userId?: string;
//     username?: string;
//   }
// }
// declare module "ws" {
//     class _WS extends WebSocket { }
//     export interface WebSocket extends _WS {
//       username?: string;
//       userId?: string;
//     }
//   }

declare module "ws" {
  interface WebSocket {
    username?: string;
          userId?: string;
  }
}