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


// DELETE
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({
                message: "ID requerido"
            });
        }

        // VALIDAR SI HAY USUARIOS CON ESTE ROL
        const usuarios = await Userdb.find({ rol: id });

        if (usuarios.length > 0) {
            return res.status(400).send({
                message: "No puedes eliminar este rol porque tiene usuarios asociados"
            });
        }

        const data = await Roldb.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).send({
                message: "Rol no encontrado"
            });
        }

        res.send({
            message: "Rol eliminado correctamente"
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
