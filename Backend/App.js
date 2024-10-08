const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server);

const userSockets = {}; // for storing the users

// constroller imports
const useCont = require("./Controller/userController");

// For chat 💬💬

io.on("connection", (socket) => {
    console.log("User connected");

    // Listen for incoming messages
    socket.on("message", (message) => {
        console.log("Message:", message);

        socket.on("message123", (message) => {
            console.log("This is new message");
        });

        io.emit("message123", message + "$$$");
        // Broadcast the message to all connected clients
        io.emit("message", message);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/signup/", useCont.newCustomers);
app.post("/login/", useCont.oldCustomers);

mongoose
    .connect("mongodb://127.0.0.1:27017/chat-app")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
