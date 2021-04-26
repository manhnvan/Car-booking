const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'product',
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'seller',
    },
    amount: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ['waiting', 'processing', 'shipping', 'close', 'denied'],
        default: 'waiting'
    }
})

module.exports = mongoose.model('order_item', orderItemSchema);