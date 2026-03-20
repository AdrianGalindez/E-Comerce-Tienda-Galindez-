const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    telefono: String,

    direccion: String

})

const Providerdb = mongoose.model('providerdb', schema);

module.exports = Providerdb;
