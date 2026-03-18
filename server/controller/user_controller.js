var Userdb = require('../model/user');

// create
exports.create = (req,res)=>{
    if(!req.body){
        return res.status(400).send({ message : "Content can not be empty!"});
    }

    const user = new Userdb({
        nombre : req.body.nombre,
        email : req.body.email,
        telefono : req.body.telefono,
        direccion : req.body.direccion,
        barrio : req.body.barrio,
        puntoReferencia : req.body.puntoReferencia,
        estado : req.body.estado
    });

    user.save()
        .then(data => res.send(data))
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Error creating user"
            });
        });
}

// find
exports.find = (req, res)=>{
    if(req.query.id){
        Userdb.findById(req.query.id)
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
    }else{
        Userdb.find()
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
    }
}

// update
exports.update = (req, res)=>{
    if(!req.body){
        return res.status(400).send({ message : "Data empty"});
    }

    Userdb.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

// delete
exports.delete = (req, res)=>{
    Userdb.findByIdAndDelete(req.params.id)
        .then(data => res.send({ message : "User deleted"}))
        .catch(err => res.status(500).send(err))
}