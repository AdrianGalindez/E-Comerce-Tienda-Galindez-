const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roldb',
        required: true
    },

    telefono: String,

    estado: {
        type: String,
        default: "Activo"
    },

    fechaRegistro: {
        type: Date,
        default: Date.now
    }

})

const Admindb = mongoose.model('admindb', schema);

module.exports = Admindb;