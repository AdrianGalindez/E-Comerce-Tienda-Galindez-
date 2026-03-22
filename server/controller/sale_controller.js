var Saledb = require('../model/sales');

exports.create = async (req, res) => {
    try {
        const { cliente, productos } = req.body;
        if (!cliente || !productos || productos.length === 0) {
            return res.status(400).send({ message: "Datos incompletos" });
        }
        let total = 0;
        // Calcular total
        const detalles = [];
        for (let item of productos) {
            const productoDB = await Productdb.findById(item.producto);

            if (!productoDB) {
                return res.status(404).send({ message: "Producto no encontrado" });
            }
            const subtotal = productoDB.precio * item.cantidad;
            total += subtotal;
            detalles.push({
                producto: item.producto,
                cantidad: item.cantidad,
                precioUnitario: productoDB.precio,
                subtotal: subtotal
            });
        }
        // Crear venta
        const venta = new Saledb({
            cliente: cliente,
            total: total
        });
        const ventaGuardada = await venta.save();
        // Guardar detalles
        for (let d of detalles) {
            await new SaleDetaildb({
                venta: ventaGuardada._id,
                ...d
            }).save();
        }
        res.send(ventaGuardada);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.find = async (req, res) => {
    try {
        const ventas = await Saledb.find().populate('cliente');
        const result = [];
        for (let v of ventas) {
            const detalles = await SaleDetaildb.find({ venta: v._id })
                .populate('producto');
            result.push({
                ...v.toObject(),
                detalles
            });
        }
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.delete = async (req, res) => {
    try {
        await SaleDetaildb.deleteMany({ venta: req.params.id });
        await Saledb.findByIdAndDelete(req.params.id);
        res.send({ message: "Venta eliminada correctamente" });
    } catch (err) {
        res.status(500).send(err);
    }
};
