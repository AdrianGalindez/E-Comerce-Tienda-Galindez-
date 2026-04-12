const axios = require('axios');
// ==================== VENTAS ===========================
exports.create_sale_form = (req, res) => {
    // Traemos productos y usuarios para el formulario
    Promise.all([
        axios.get('http://localhost:3000/api/productos'),
        axios.get('http://localhost:3000/api/users')
    ])
    .then(([productosRes, usersRes]) => {
        res.render('create_ventas', { 
            productos: productosRes.data, 
            users: usersRes.data 
        });
    })
    .catch(err => res.send(err));
};


exports.sales = (req, res) => {
    axios.get('http://localhost:3000/api/ventas')
        .then(response => {
            res.render('read_sales', { sales: response.data });
        })
        .catch(err => res.send(err));
};


exports.update_sale = async (req, res) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/ventas/${req.query.id}`
        );

        res.render('update_sale', { sale: response.data });

    } catch (err) {
        res.send(err.message);
    }
};


// ================= DETALLE VENTAS ======================
exports.create_sale_detail_form = (req, res) => {
    Promise.all([
        axios.get('http://localhost:3000/api/ventas'),
        axios.get('http://localhost:3000/api/productos')
    ])
    .then(([ventasRes, productosRes]) => {

        console.log("VENTAS:", ventasRes.data);
        console.log("PRODUCTOS:", productosRes.data);

        res.render('create_detalleVenta', {
            ventas: ventasRes.data,
            productos: productosRes.data
        });
    })
    .catch(err => res.send(err.message));
};

exports.read_sale_details = (req, res) => {
    axios.get('http://localhost:3000/api/detalle-ventas')
        .then(response => {
            res.render('read_detailsSales', { saleDetails: response.data });
        })
        .catch(err => res.send(err));
};


exports.update_sale_detail = (req, res) => {
    axios.get('http://localhost:3000/api/detalle-ventas', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_saleDetail', { detail: response.data });
        })
        .catch(err => res.send(err));
};
