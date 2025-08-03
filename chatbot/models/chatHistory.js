const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatHistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  userAsk: {
    type: String,
    required: true,
  },
  botAnswer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chatHistory = mongoose.model("ChatHistory", chatHistorySchema);
module.exports = chatHistory;
