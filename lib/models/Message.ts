import mongoose, { Schema, models, model } from "mongoose";

export interface IMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
  createdAt?: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: "New portfolio message" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default (models.Message as mongoose.Model<IMessage>) || model<IMessage>("Message", MessageSchema);
