const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        require: true
    },
    status: {
        type: String,
        require: true,
        default: 'uncompleted'
    },
    shippingCost: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('order', OrderSchema);