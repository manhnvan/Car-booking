const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    star: {
        type: Number,
        require: function() {
            return this.star > 0.5 && this.star <= 5 
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('rating', ratingSchema);