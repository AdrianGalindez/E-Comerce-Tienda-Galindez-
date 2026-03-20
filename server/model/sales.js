const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    fecha: {
        type: Date,
        default: Date.now
    },

    total: {
        type: Number,
        required: true
    }

})

const Salesdb = mongoose.model('saledb', schema);

module.exports = Salesdb;
