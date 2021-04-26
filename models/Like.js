const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('like', likeSchema);