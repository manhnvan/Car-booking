const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }
})

module.exports = mongoose.model('follow', followSchema);