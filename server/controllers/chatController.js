const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const mongoose = require('mongoose')

// fetchs existing specific chat or creates a new chat 
const accessChat = async (req, res) => {
    // console.log("in chat controller");
    // client will send the userId of the user they wish to chat with
    const { userId } = req.body;

    if (!userId) {
        console.log("userId not sent in request");
        return res.status(400).json({ message: "userId not sent in request" });
    }

    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    }).populate("users", "-password").populate("latestMessage");


    // this is to populate the sender (users) feild in the latestMessage
    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name profilePicture email",
    });

    console.log("IN CHAT CONTROLLER", isChat);

    // if chat exsits then send it back to the user
    if (isChat.length > 0) {
        res.send(isChat[0]);
    }
    // if this chat does not exsit then create new chat 
    else {
        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

// fetches all chats of the specific user
const fetchChats = async (req, res) => {
    try {
        // console.log(req.user);
        let chats = await Chat.find({
            users: {
                $elemMatch: { $eq: req.user._id }
            }
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async results => {
                results = await User.populate(results, {
                    // this is to populate the sender (users) feild in the latestMessage
                    path: "latestMessage.sender",
                    select: "name profilePicture email"
                })
                res.status(200).send(results);
            })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

// creates group chat
const createGroupChat = async (req, res) => {

    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all the feilds" });
    }

    let users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send("Atleast 2 users are required to form a group chat")
    }

    // add our current user (logged in user) to the list of users for group chat
    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const createdGroupChat = await Chat.findOne({ _id: groupChat.id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");


        res.status(200).json(createdGroupChat);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

}

// rename the group chat
const renameGroup = async (req, res) => {
    const { chatId, chatName } = req.body;

    if (!chatId || !chatName) {
        return res.status(400).send({ message: "Please fill all the feilds" });
    }

    try {
        const updatedGroupChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName,
            },
            {
                new: true
            }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(updatedGroupChat);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }

}

// remove a user from group chat
const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    if (!chatId || !userId) {
        return res.status(400).send({ message: "Please fill all the feilds" });
    }

    try {
        const updatedGroupChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: { users: userId },
            },
            {
                new: true
            }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(updatedGroupChat);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

// add user/users to group chat
const addToGroup = async (req, res) => {
    const { chatId, userIds } = req.body;
    console.log(chatId, userIds);
    if (!chatId || !userIds) {
        return res.status(400).send({ message: "Please fill all the feilds" });
    }

    try {
        const updatedGroupChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: { users: [...userIds] },
            },
            {
                new: true
            }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password");

        res.status(200).send(updatedGroupChat);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

module.exports = { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup };