import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import MESSAGE from "../models/messageModel.js";
import USER from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filterUsers = await USER.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      message: "Users fetched successfully.",
      filterUsers,
    });
  } catch (error) {
    console.log(error.message, "Error in getting user");
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await MESSAGE.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json({
      messages,
      message: "Got all messages successfully.",
    });
  } catch (error) {
    console.log("error in getting messages", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new MESSAGE({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("error in sending messages", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
