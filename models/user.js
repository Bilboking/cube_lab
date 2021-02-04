const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//id, username, password (hashed)

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20
    },

    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 20
    }

});

const User = mongoose.model("User", userSchema);

module.exports = User;