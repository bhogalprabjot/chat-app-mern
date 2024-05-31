const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        return res.status(400).send({ message: "Please fill all the feilds" });
    }

    var newMessage = {
        chat: chatId,
        content: content,
        sender: req.user._id,
    }

    try {

        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name profilePicture");

        message = await message.populate("chat");

        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name profilePicture email',
        })

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: message
        })

        res.status(201).send(message);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }

}


const getAllMessages = async (req, res) => {

    const { chatId } = req.params;

    // console.log(chatId);
    try {
        const messages = await Message.find({ chat: chatId }).populate("sender", "name email profilePicture").populate("chat");

        // console.log(messages);

        res.status(200).send(messages);

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { sendMessage, getAllMessages };