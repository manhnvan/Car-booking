const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'seller'
    },
    productName: {
        type: String,
        require: true
    },
    description: String,

    categories: [String],

    hiddenCategories: String,

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
    },
    created: {
        type: Date,
        default: Date.now
    }
})
// productSchema.index({ "$**": "text" },{ name: "TextIndex" });
module.exports = mongoose.model('product', productSchema);