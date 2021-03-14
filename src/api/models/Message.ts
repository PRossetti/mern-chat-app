import { Schema, model } from 'mongoose';

const whatsappMessageSchema = new Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

export default model('messageContent', whatsappMessageSchema);
