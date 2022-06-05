const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, '/tmp/my-uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.filename + '-' + Date.now())
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;