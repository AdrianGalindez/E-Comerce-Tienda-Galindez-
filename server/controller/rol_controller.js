var Roldb = require('../model/rol');

// =======================
// CREATE
// =======================
exports.create = (req, res) => {

    const rol = new Roldb({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    });

    rol.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
}


// =======================
// FIND
// =======================
exports.find = (req, res) => {

    Roldb.find()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
}


// =======================
// UPDATE
// =======================
exports.update = (req, res) => {

    Roldb.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
}


// =======================
// DELETE
// =======================
exports.delete = (req, res) => {

    Roldb.findByIdAndDelete(req.params.id)
        .then(data => res.send({ message: "Rol eliminado" }))
        .catch(err => res.status(500).send(err));
}
