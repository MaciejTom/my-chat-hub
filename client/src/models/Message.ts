// export interface Message {
//     username: string;
//     recipient: number;
//     text: string;
//     file: string;
// }
export interface Message {
   recipient: string,
   sender: string,
   text: string,
   _id: number
   file?: string,
}