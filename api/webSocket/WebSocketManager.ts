import http from "http";
import WebSocket, { WebSocketServer } from "ws";
import { ExtendedWebSocket } from "../models/ExtendedWebSocket";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../models/JwtPayload";
import fs from "fs";
import path from "path";
import { Message } from "../models/Message";
import { FileObject } from "../models/FileObject";

export class WebSocketManager {
  private wss: WebSocketServer;
  constructor(server: http.Server) {
    this.wss = new WebSocketServer({ server });
    this.wss.on(
      "connection",
      (connection: ExtendedWebSocket, req: http.IncomingMessage) =>
        this.onConnection(connection, req)
    );
  }
  private async onConnection(
    connection: ExtendedWebSocket,
    req: http.IncomingMessage
  ) {
    connection.isAlive = true;
    connection.timer = setInterval(() => {
      connection.ping();
      connection.deathTimer = setTimeout(() => {
        connection.isAlive = false;
        clearInterval(connection.timer);
        connection.terminate();
        this.notifyAboutOnlinePeople();
        console.log("dead");
      }, 1000);
    }, 5000);

    connection.on("pong", () => {
      clearTimeout(connection.deathTimer);
    });

    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenCookieString = cookies
        .split(";")
        .find((str) => str.startsWith("token="));
      if (tokenCookieString) {
        const token = tokenCookieString.split("=")[1];
        if (token) {
          const userData = jwt.verify(
            token,
            String(process.env.JWT_SECRET)
          ) as JwtPayload;
          connection.userId = userData.userId;
          connection.username = userData.username;
        }
      }
    }

    connection.on("message", (message) => this.onMessage(message, connection));

    this.notifyAboutOnlinePeople();
  }
  private notifyAboutOnlinePeople() {
    const clientsArray = [
      ...this.wss.clients,
    ] as unknown as ExtendedWebSocket[];
    clientsArray.forEach((client) => {
      client.send(
        JSON.stringify({
          online: clientsArray.map((c) => ({
            userId: c.userId,
            username: c.username,
          })),
        })
      );
    });
  }
  private async onMessage(
    message: MessageEvent,
    connection: ExtendedWebSocket
  ) {
    const stringMessage = message.toString();
    const messageData = JSON.parse(stringMessage);
    console.log("Message received");
    const { recipient, text, file } = messageData;
    let filename: string | null = null;
    if (file) {
      filename = this.saveFileOnDisc(file);
    }
    if (recipient && (text || file)) {
      const messageDoc = await Message.create({
        sender: connection.userId,
        recipient,
        text,
        file: file ? filename : null,
      });
      const clientsArray = [
        ...this.wss.clients,
      ] as unknown as ExtendedWebSocket[];
      clientsArray
        .filter((c) => c.userId === recipient)
        .forEach((c) =>
          c.send(
            JSON.stringify({
              text,
              sender: connection.userId,
              recipient,
              file: file ? filename : null,
              _id: messageDoc._id,
            })
          )
        );
    }
  }
  private saveFileOnDisc(file: FileObject) {
    const parts = file.name.split(".");
    const ext = parts[parts.length - 1];
    const filename = Date.now() + "." + ext;
    const pathName = path.join(__dirname, "..", "uploads", filename);
    const stringData = file.data as unknown as string;
    const base64Data = stringData.split(",")[1];
    const fileData = Buffer.from(base64Data, "base64");
    fs.writeFile(pathName, fileData, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("file saved: " + pathName);
      }
    });
    return filename;
  }
}
