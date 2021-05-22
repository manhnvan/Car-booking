const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    shopName: {
        type: String,
        require: true,
        unique: true
    },
    avatar: {
        type: String,
    }
})

module.exports = mongoose.model('seller', sellerSchema);