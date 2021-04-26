const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    productName: {
        type: String,
        require: true
    },
    description: String,
    categories: [String],
    productImages: [String],
    thumbnail: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    unit: {
        type: String,
        require: true,
    },
    vendor: String,
    rating: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('product', productSchema);