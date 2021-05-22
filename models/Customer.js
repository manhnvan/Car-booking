const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String
    }
})

module.exports = mongoose.model('customer', customerSchema);