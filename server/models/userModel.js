const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        password: { type: String, require: true },
        profilePicture: {
            type: String, require: true, default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },

    },
    {
        timeStamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;