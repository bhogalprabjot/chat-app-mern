const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require('./routes/messageRoutes');

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world this is chat app")
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server Started on Port ${PORT}`));