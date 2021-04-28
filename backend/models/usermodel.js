var mongoose = require('mongoose');

const userschema = mongoose.Schema({
    username: { type: 'string', required: true, unique: true },
    useremail: { type: 'string', required: true, unique: true },
    userpassword: { type: 'string', required: true }
}, { timestamps: true });

const usermodel = mongoose.model('users', userschema)

module.exports = usermodel;