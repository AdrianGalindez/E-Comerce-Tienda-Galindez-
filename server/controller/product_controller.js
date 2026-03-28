var Productdb = require('../model/product');
const mongoose = require('mongoose');
const path = require('path');



// Crear producto
exports.create = async (req, res) => {
  try {
    const { nombre, descripcion, precioCosto, precio, stock, categoria, marca, proveedor } = req.body;

    // Validaciones básicas
    if (!nombre || !precio || !precioCosto || !stock || !categoria || !marca) {
      return res.status(400).send({ message: "Faltan datos obligatorios" });
    }

    if (isNaN(precio) || isNaN(precioCosto) || isNaN(stock)) {
      return res.status(400).send({ message: "Precio, costo y stock deben ser números" });
    }

    if (Number(precio) < Number(precioCosto)) {
      return res.status(400).send({ message: "El precio de venta no puede ser menor al costo" });
    }

    // Validación de ObjectId
    if (!mongoose.Types.ObjectId.isValid(categoria)) return res.status(400).send({ message: "ID de categoría inválido" });
    if (!mongoose.Types.ObjectId.isValid(marca)) return res.status(400).send({ message: "ID de marca inválido" });
    if (proveedor && !mongoose.Types.ObjectId.isValid(proveedor)) return res.status(400).send({ message: "ID de proveedor inválido" });

    // Imagen
    const rutasImagenes = req.files
      ? req.files.map(file => `/assets/img/${file.filename}`)
      : [];

    // Crear producto
    const product = new Productdb({
      nombre,
      descripcion: descripcion || "",
      precioCosto: Number(precioCosto),
      precio: Number(precio),
      stock: Number(stock),
      categoria,
      marca,
      proveedor: proveedor || null,
      fotos: rutasImagenes
    });

    const savedProduct = await product.save();
    res.status(201).redirect('/read-producto'); // redirige a la lista de productos
  } catch (err) {
    console.error("ERROR CREATE PRODUCT:", err);
    res.status(500).send({ message: err.message });
  }
};


// find
exports.find = (req,res)=>{
    if(req.query.id){
        Productdb.findById(req.query.id)
            .populate('marca')
            .populate('categoria')
            .populate({
                path: 'proveedor',
                match: { _id: { $exists: true } }
            })
            .then(data => res.send(data))
            .catch(err => {
                console.error("ERROR EN FIND:", err);
                res.status(500).send(err);
            })
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
exports.update = async (req, res) => {
    try {
        const product = await Productdb.findById(req.params.id);

        if (!product) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        const nuevoPrecio = req.body.precio ? Number(req.body.precio) : product.precio;
        const nuevoCosto = req.body.precioCosto ? Number(req.body.precioCosto) : product.precioCosto;

        if (nuevoPrecio < nuevoCosto) {
            return res.status(400).send({
                message: "El precio no puede ser menor al costo"
            });
        }

        const updated = await Productdb.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.send(updated);

    } catch (err) {
        res.status(500).send(err);
    }
};

// delete
exports.delete = async (req, res) => {
    try {
        const data = await Productdb.findByIdAndDelete(req.params.id);

        if (!data) {
            return res.status(404).send({ message: "Producto no encontrado" });
        }

        res.send({ message: "Producto eliminado correctamente" });

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
