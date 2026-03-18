const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}


exports.promociones = (req, res) =>{
    console.log("ENTRO A PROMOCIONES")
    const promociones = [
        {
            nombre: "Coca Cola 1.5L",
            precio: 3500,
            precioAnterior: 4500,
            descuento: 22,
            img: "/img/coca.jpg",
            categoria: "bebidas"
        }
    ]
    res.render('promociones', { promociones })
}

exports.marcas = (req, res) =>{
    res.render('marcas');
}


exports.carrito = (req, res) =>{
    res.render('carrito');
}

const productos = [
    { nombre: "Coca Cola", precio: 3000, img: "/img/coca.jpg", categoria: "bebidas" },
    { nombre: "Pepsi", precio: 2800, img: "/img/pepsi.jpg", categoria: "bebidas" },
    { nombre: "Jabon", precio: 2500, img: "/img/jabon.jpg", categoria: "aseo" },
    { nombre: "Tomate", precio: 1800, img: "/img/tomate.jpg", categoria: "verduras" },
    { nombre: "Cuaderno", precio: 5000, img: "/img/cuaderno.jpg", categoria: "papeleria" },
    { nombre: "Ibuprofeno", precio: 8000, img: "/img/medicina.jpg", categoria: "medicina" }
]

exports.categoria = (req, res) => {
    const nombre = req.params.nombre
    renderCategoria(nombre, res)
}

function renderCategoria(nombre, res){
    const filtrados = productos.filter(p => p.categoria === nombre)

    res.render('categoria', {
        categoria: nombre,
        productos: filtrados
    })
} 

exports.bebidas = (req, res) =>{
    renderCategoria('bebidas', res);
}

exports.papeleria = (req, res) =>{
    renderCategoria('papeleria', res);
}

exports.verduras = (req, res) =>{
    renderCategoria('verduras', res);
}

exports.medicina = (req, res) =>{
    renderCategoria('medicina', res);
}
exports.otros = (req, res) =>{
    renderCategoria('otros', res);
}

exports.aseo = (req, res) =>{
    renderCategoria('aseo', res);
}




// ======================
// CATEGORIAS
// ======================

exports.categoria = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){

            const productos = response.data.filter(p => 
                p.categoria?.nombre === req.params.nombre
            );

            res.render('categoria', { productos });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.bebidas = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){
            const productos = response.data.filter(p => 
                p.categoria?.nombre === "Bebidas"
            );
            res.render('bebidas', { productos });
        })
        .catch(err => res.send(err))
}

exports.papeleria = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){
            const productos = response.data.filter(p => 
                p.categoria?.nombre === "Papelería y miscelania"
            );
            res.render('papeleria', { productos });
        })
        .catch(err => res.send(err))
}

exports.aseo = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){
            const productos = response.data.filter(p => 
                p.categoria?.nombre === "Productos de aseo"
            );
            res.render('aseo', { productos });
        })
        .catch(err => res.send(err))
}

exports.verduras = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){
            const productos = response.data.filter(p => 
                p.categoria?.nombre === "Verduras Frutas y vegetales"
            );
            res.render('verduras', { productos });
        })
        .catch(err => res.send(err))
}

exports.medicina = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){
            const productos = response.data.filter(p => 
                p.categoria?.nombre === "Medicina"
            );
            res.render('medicina', { productos });
        })
        .catch(err => res.send(err))
}

exports.otros = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){
            const productos = response.data.filter(p => 
                p.categoria?.nombre === "Otros"
            );
            res.render('otros', { productos });
        })
        .catch(err => res.send(err))
}


// ======================
// MARCAS
// ======================

exports.marcas = (req, res)=>{
    axios.get('http://localhost:3000/api/marcas')
        .then(function(response){
            res.render('marcas', { marcas : response.data });
        })
        .catch(err => res.send(err))
}


// ======================
// PROMOCIONES
// ======================

exports.promociones = (req, res)=>{
    axios.get('http://localhost:3000/api/productos')
        .then(function(response){

            const productos = response.data.filter(p => p.stock > 20);

            res.render('promociones', { productos });
        })
        .catch(err => res.send(err))
}


// ======================
// CARRITO
// ======================

exports.carrito = (req, res)=>{
    res.render('carrito');
}


exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}