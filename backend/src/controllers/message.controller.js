import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterdUsers);
    }
    catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Failed to fetch contacts" });
    }
};

export const getMessagesByUserId = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: userToChatId } = req.params;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error fetching chats:", error.messages);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        const receiverExists = await User.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // send message in real-time if user is online - socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sending message:", error.message);
        res.status(500).json({ error: "Failed to send message" });
    }
};

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        });

        const chatPartnerIds = [...new Set(messages.map((msg) =>
            msg.senderId.toString() === loggedInUserId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
        ))];

        const chatPartners = await User.find({ _id: { $in: chatPartnerIds } }).select("-password");

        res.status(200).json(chatPartners);
    }
    catch (error) {
        console.log("Error fetching chat partners:", error.message);
        res.status(500).json({ error: "Failed to fetch chat partners" });
    }
};