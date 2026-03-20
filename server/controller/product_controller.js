var Productdb = require('../model/product');

// create
exports.create = (req,res)=>{
    if(!req.body.nombre || !req.body.precio || !req.body.stock){
        return res.status(400).send({ message: "Faltan datos obligatorios" });
    }
    console.log("BODY:", req.body);
    const product = new Productdb({
        nombre : req.body.nombre,
        marca : req.body.marca,
        categoria : req.body.categoria,
        proveedor : req.body.proveedor,
        precio : req.body.precio,
        stock : req.body.stock
    });

    product.save()
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err));
}

// find
exports.find = (req,res)=>{
    if(req.query.id){
        Productdb.findById(req.query.id)
            .populate('marca')
            .populate('categoria')
            .populate('proveedor')
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
    }else{
        Productdb.find()
            .populate('marca')
            .populate('categoria')
            .populate('proveedor')
            .then(data => res.send(data))
            .catch(err => res.status(500).send(err))
    }
}

// update
exports.update = (req,res)=>{
    Productdb.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
}

// delete
exports.delete = (req,res)=>{
    Productodb.findByIdAndDelete(req.params.id)
        .then(data => res.send({ message : "Producto eliminado"}))
        .catch(err => res.status(500).send(err))
}
