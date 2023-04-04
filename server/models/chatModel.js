const mongoose = require('mongoose');

const chatSchema = mongoose.Schema(
    {
        chatName: {type: String, trim: true},
        isGroupChat: {type: Boolean, default: false},
        users:[
            {
                type: mongoose.Schema.Types.ObjectIdm,
                ref: "User",
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timStamps: truem
    }
);

const Chat = mongoose.model("Chat", chatModel);