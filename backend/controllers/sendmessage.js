import mongoose from "mongoose";
import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";

export const sendmessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Validate if senderId and receiverId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: "Invalid senderId or receiverId" });
    }

    // Create the message object
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Validate the message object
    const validationError = newMessage.validateSync();
    if (validationError) {
      console.error("Message validation error:", validationError.message);
      return res.status(400).json({ error: validationError.message });
    }

    // Save the message to the database
    await newMessage.save();

    // Find or create conversation and update messages array
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    conversation.messages.push(newMessage._id);
    await conversation.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendmessage controller:", error.message);
    res.status(500).json({ error: "Error in sendmessage controller" });
  }
};
export const getmessage = async (req, res) => {
  try {
    const { id: usertochatid } = req.params;
    const senderid = req.user._id; // Assuming user._id is correctly populated in req.user

    const conversation = await Conversation.findOne({
      participants: { $all: [senderid, usertochatid] }
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error in getmessage controller:", error.message);
    res.status(500).json({ error: "Error in getmessage controller" });
  }
};
 