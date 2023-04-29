export interface Message {
   recipient: string,
   sender: string,
   text: string,
   _id: number
   file?: string,
}