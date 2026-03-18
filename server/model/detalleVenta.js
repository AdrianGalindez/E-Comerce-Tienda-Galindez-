const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    venta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ventadb'
    },

    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productodb'
    },

    cantidad: {
        type: Number,
        required: true
    },

    precioUnitario: {
        type: Number,
        required: true
    }

})

const DetalleVentadb = mongoose.model('detalleventadb', schema);

module.exports = DetalleVentadb;