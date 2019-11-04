const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    role: { type: String, require: true },
    university: { type: String, require: true },
    subject: { type: String, require: true },
    date: { type: Date, default: Date.now },
})

module.exports = User = mongoose.model("users", UserSchema);