const mongoose = require('mongoose');

const coordinateSchema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    identification: {
        type: String,
        require: true,
        unique: true
    },

})

module.exports = mongoose.model('coordinate', coordinateSchema);