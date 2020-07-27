// here we will create the schema for our users collection
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create scheme
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

//const User = mongoose.model('User', userSchema);
module.exports = User = mongoose.model('users', userSchema);