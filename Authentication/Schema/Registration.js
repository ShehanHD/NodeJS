const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
    name: String,
    db: String,
    ip: String,
    db_username: String,
    db_password: String,
    db_port: String
})

module.exports = mongoose.model('registration', registerSchema);