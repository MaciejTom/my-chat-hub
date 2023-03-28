import mongoose from 'mongoose';
import { Schema, Model, Types } from "mongoose";

export interface Message {
  sender: Types.ObjectId;
  recipient: Types.ObjectId;
  text: string;
  file: string;
}

  const MessageSchema = new Schema<Message>({
    sender: {type: Schema.Types.ObjectId, ref: 'User'},
    recipient: {type: Schema.Types.ObjectId, ref: 'User'},
    text: String,
    file: String,
  }, {timestamps:true});

export const Message: Model<Message> = mongoose.model<Message>('Message', MessageSchema);
