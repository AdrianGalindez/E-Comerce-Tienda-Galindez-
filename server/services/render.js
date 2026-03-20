const axios = require('axios');


// ==================== CLIENTES =========================

// Página principal
exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/productos')
        .then(response => {
            res.render('index', { productos: response.data });
        })
        .catch(err => res.send(err));
};

// Categoría dinámica
exports.category = (req, res) => {
    axios.get('http://localhost:3000/api/productos')
        .then(response => {
            const productos = response.data.filter(p => 
                p.categoria?.nombre === req.params.nombre
            );
            res.render('categories', { productos });
        })
        .catch(err => res.send(err));
};

// Promociones
exports.promotions = (req, res) => {
    axios.get('http://localhost:3000/api/productos')
        .then(response => {
            const productos = response.data.filter(p => p.stock > 20);
            res.render('promotions', { productos });
        })
        .catch(err => res.send(err));
};

// Carrito
exports.car = (req, res) => {
    res.render('car');
};

// Marcas (cliente)
exports.brands = (req, res) => {
    axios.get('http://localhost:3000/api/marcas')
        .then(response => {
            res.render('brands', { marcas: response.data });
        })
        .catch(err => res.send(err));
};



// ==================== PRODUCTOS ========================

exports.create_product = (req, res) => {
    axios.post('http://localhost:3000/api/productos', req.body)
        .then(response => {
            res.redirect('/create_producto');
        })
        .catch(err => res.send(err));
};

exports.read_products = (req, res) => {
    axios.get('http://localhost:3000/api/productos')
        .then(response => {
            res.render('read_products', { productos: response.data });
        })
        .catch(err => res.send(err));
};

exports.update_products = (req, res) => {
    axios.get('http://localhost:3000/api/productos', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_products', { producto: response.data });
        })
        .catch(err => res.send(err));
};

exports.delete_product = (req, res) => {
    axios.delete(`http://localhost:3000/api/productos/${req.params.id}`)
        .then(response => {
            res.redirect('read_products');
        })
        .catch(err => res.send(err));
};



// ==================== CATEGORÍAS =======================

exports.create_category = (req, res) => {
    res.render('create_categoria');
};

exports.read_categories = (req, res) => {
    axios.get('http://localhost:3000/api/categorias')
        .then(response => {
            res.render('read_categories', { categories: response.data });
        })
        .catch(err => res.send(err));
};

exports.update_category = (req, res) => {
    axios.get('http://localhost:3000/api/categorias', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_categoria', { category: response.data });
        })
        .catch(err => res.send(err));
};




// ==================== MARCAS ===========================

exports.read_brands = (req, res) => {
    axios.get('http://localhost:3000/api/marcas')
        .then(response => {
            res.render('read_brands', { brands: response.data });
        })
        .catch(err => res.send(err));
};


exports.update_brand = (req, res) => {
    axios.get('http://localhost:3000/api/marcas', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_brands', { brand: response.data });
        })
        .catch(err => res.send(err));
};

exports.create_brand = (req, res) => {
    res.render('create_brands');
};



// ==================== PROVEEDORES ======================

exports.read_providers = (req, res) => {
    axios.get('http://localhost:3000/api/proveedores')
        .then(response => {
            res.render('read_providers', { providers: response.data });
        })
        .catch(err => res.send(err));
};

exports.update_provider = (req, res) => {
    axios.get('http://localhost:3000/api/proveedores', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_provider', { provider: response.data });
        })
        .catch(err => res.send(err));
};

exports.create_provider = (req, res) => {
    res.render('create_provider');
};



// ==================== USUARIOS =========================

exports.add_user = (req, res) => {
    res.render('add_user'); 
};

exports.read_users = (req, res) => {
    axios.get('http://localhost:3000/api/users')
        .then(response => {
            res.render('read_users', { users: response.data });
        })
        .catch(err => res.send(err));
};

exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params: { id: req.query.id } })
        .then(userdata => {
            res.render('update_user', { user: userdata.data });
        })
        .catch(err => res.send(err));
};



// ==================== ROLES ============================

exports.read_roles = (req, res) => {
    axios.get('http://localhost:3000/api/roles')
        .then(response => {
            res.render('read_rols', { roles: response.data });
        })
        .catch(err => res.send(err));
};

exports.update_rol = (req, res) => {
    axios.get('http://localhost:3000/api/roles', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_rol', { rol: response.data });
        })
        .catch(err => res.send(err));
};

exports.create_rol = (req, res) => {
    res.render('create_rol');
};



// ==================== VENTAS ===========================

exports.sales = (req, res) => {
    axios.get('http://localhost:3000/api/ventas')
        .then(response => {
            res.render('read_sales', { sales: response.data });
        })
        .catch(err => res.send(err));
};

exports.update_sale = (req, res) => {
    axios.get('http://localhost:3000/api/ventas', { params: { id: req.query.id }})
        .then(response => {
            res.render('update_sale', { sale: response.data });
        })
        .catch(err => res.send(err));
};



// ================= DETALLE VENTAS ======================

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


