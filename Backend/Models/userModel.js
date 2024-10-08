const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
