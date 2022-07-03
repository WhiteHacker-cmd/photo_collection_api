const mongoose = require("mongoose");


const PhotoSchema = new mongoose.Schema({
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    oringinal_name: {
        type: String,
        required: true
    },
    path: String,
    download_count: {
        type: String,
        default: 0
    }
})

const Photo = mongoose.model("Photo", PhotoSchema)

module.exports = Photo;