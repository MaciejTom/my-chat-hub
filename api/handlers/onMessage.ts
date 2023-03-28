import { WebSocketServer } from "ws";
import { ExtendedWebSocket } from "../models/ExtendedWebSocket";
import {Message} from '../models/Message'
export const onMessage = async (message: MessageEvent, connection: ExtendedWebSocket, wss: WebSocketServer) => {
    const stringMEssage = message.toString()
    const messageData = JSON.parse(stringMEssage);
    const {recipient, text, file} = messageData;
    // let filename: <string | null> = null;
    // if (file) {
    //   console.log('size', file.data.length);
    //   const parts = file.name.split('.');
    //   const ext = parts[parts.length - 1];
    //   filename = Date.now() + '.'+ext;
    //   const path = __dirname + '/uploads/' + filename;
    //   const bufferData = new Buffer(file.data.split(',')[1], 'base64');
    //   fs.writeFile(path, bufferData, () => {
    //     console.log('file saved:'+path);
    //   });
    // }
    console.log(text)
    if (recipient && (text || file)) {
      const messageDoc = await Message.create({
        sender:connection.userId,
        recipient,
        text,
        // file: file ? filename : null,
      });
      console.log('created message');
      [...wss.clients]
        .filter(c => c.userId === recipient)
        .forEach(c => c.send(JSON.stringify({
          text,
          sender:connection.userId,
          recipient,
          // file: file ? filename : null,
          _id:messageDoc._id,
        })));
    }
}