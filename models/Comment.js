const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    content: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('comments', commentSchema);