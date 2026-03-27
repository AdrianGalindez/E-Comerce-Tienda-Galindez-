var Providerdb = require('../model/provider');


// =======================
// CREATE
// =======================

exports.create = (req,res)=>{
    if(!req.body){
        return res.status(400).send({ message : "Content can not be empty!"});
    }

    const provider = new Providerdb({
        nombre : req.body.nombre,
        telefono : req.body.telefono,
        direccion : req.body.direccion
    });

    provider
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error creating proveedor"
            });
        });
}


// =======================
// FIND
// =======================

exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Providerdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Proveedor no encontrado con id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving proveedor with id " + id})
            })

    }else{
        Providerdb.find()
            .then(provider => {
                res.send(provider)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error retrieving proveedores" })
            })
    }
}


// =======================
// UPDATE
// =======================

exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;

    Providerdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update proveedor with ${id}. Maybe not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error updating proveedor information"})
        })
}


// =======================
// DELETE
// =======================

const Productdb = require('../model/product');

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).send({
                message: "ID requerido"
            });
        }

        // 🔴 VALIDAR RELACIÓN CON PRODUCTOS
        const productos = await Productdb.find({ proveedor: id });

        if (productos.length > 0) {
            return res.status(400).send({
                message: "No puedes eliminar este proveedor porque tiene productos asociados"
            });
        }

        const data = await Providerdb.findByIdAndDelete(id);

        if (!data) {
            return res.status(404).send({
                message: "Proveedor no encontrado"
            });
        }

        res.send({
            message: "Proveedor eliminado correctamente"
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
