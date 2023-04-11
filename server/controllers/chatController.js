const User = require("../models/userModel");
const Chat = require("../models/chatModel");


// fetchs existing chats or creates a new chat 
const accessChat = async (req, res) => {
    // console.log("in chat controller");
    // client will send the userId with which they wish to chat
    const { userId } = req.body;

    if (!userId) {
        console.log("UserID not sent in request");
        return res.status(400).json({ message: "UserID not sent in request" });
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password").populate("latestMessage");

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name profilePicture email",
    });

    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(FullChat);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = { accessChat };