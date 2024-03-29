const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        email: { type: String, require: true },
        password: { type: String, require: true },
        profilePicture: {
            type: String, default:
                "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },

    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;