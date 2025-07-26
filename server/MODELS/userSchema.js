const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        require: true,
        unique: true
    },
    email : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    image : {
        type: String
    }
});

module.exports = mongoose.model("user", userSchema);
