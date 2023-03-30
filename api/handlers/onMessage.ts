import { WebSocketServer } from "ws";
import { ExtendedWebSocket } from "../models/ExtendedWebSocket";
import {Message} from '../models/Message'
import fs from 'fs';
import path from 'path';

export const onMessage = async (message: MessageEvent, connection: ExtendedWebSocket, wss: WebSocketServer) => {
    const stringMessage = message.toString()
    const messageData = JSON.parse(stringMessage);
    const {recipient, text, file} = messageData;
    let filename: string | null = null;
    if (file) {
      console.log('size', file.data.length);
      const parts = file.name.split('.');
      const ext = parts[parts.length - 1];
      filename = Date.now() + '.'+ext;
      const pathName = path.join(__dirname,'..', 'uploads', filename);
      // const path = __dirname + '\uploads\' + filename;
      const bufferData = Buffer.from(file.data.split(',')[1], 'base64');
      fs.writeFile(pathName, bufferData, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('file saved: ' + pathName);
        }
      });
    }
    console.log(text)
    if (recipient && (text || file)) {
      const messageDoc = await Message.create({
        sender:connection.userId,
        recipient,
        text,
        file: file ? filename : null,
      });
      console.log('created message');
      [...wss.clients]
        .filter(c => c.userId === recipient)
        .forEach(c => c.send(JSON.stringify({
          text,
          sender:connection.userId,
          recipient,
          file: file ? filename : null,
          _id:messageDoc._id,
        })));
    }
}