const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    uploaded_photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo"
    }]
    
});

const User = mongoose.model("User", UserSchema);

module.exports = User;