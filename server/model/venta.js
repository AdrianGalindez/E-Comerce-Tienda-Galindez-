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

const Ventadb = mongoose.model('ventadb', schema);

module.exports = Ventadb;