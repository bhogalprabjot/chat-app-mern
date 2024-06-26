const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const { Server } = require("socket.io");
const { createServer } = require("http");
const path = require("path");

const app = express();

const options = [
    cors({
        origin: '*',
        methods: '*',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
];
app.use(options);

dotenv.config();
connectDB();

app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello world this is chat app")
// });

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/client/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, console.log(`Server Started on Port ${PORT}`));
const httpServer = createServer(app);


const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        // credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");


    socket.on('setup', (userData) => {
        socket.join(userData?._id);
        console.log(`User ${userData?.name} ${userData?._id} connected`);
        socket.emit("connected");
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    })

    socket.on('typing', (room) => {
        console.log(
            "tyyping in room ", room
        ); socket.in(room).emit("typing")
    });
    socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));


    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;

        if (!chat || !chat.users) return console.log("Invalid message received");

        chat.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id) return;

            console.log(`Sending message to user: ${user._id} ${user?.name}`);
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        })

    })

})



httpServer.listen(PORT, console.log(`Server Started on Port ${PORT}`));