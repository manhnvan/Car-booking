const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    identification: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String,
        require: true,
        unique: true
    },
    shopName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('seller', sellerSchema);