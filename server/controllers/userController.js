const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


const signup = async (req, res) => {
    const { firstName, lastName, email, password, profilePicture } = req.body;
    try {
        // check for existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create(
            {
                name: `${firstName} ${lastName}`,
                email,
                password: hashedPassword,
                profilePicture
            }
        );

        if (user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                token: generateToken(user._id),
            })
        }

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}


const signin = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User doesn't exist!" });

        const isPasswordCorect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorect)
            return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            token: generateToken(user._id),
        })

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

module.exports = { signup, signin };