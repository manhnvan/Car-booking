const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    username: {
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
    address : {
        type: String,
        require: true
    },
    city : {
        type: String,
        require: true
    },
    district : {
        type: String,
        require: true
    },
    ward : {
        type: String,
        require: true
    },
    avatar: {
        type: String
    },
    firebase_token: {
        type: String
    }
})

module.exports = mongoose.model('customer', customerSchema);