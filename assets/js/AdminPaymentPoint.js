let timeout = null;
let carrito = [];

// 🔎 BUSCADOR
document.getElementById("buscarProducto").addEventListener("keyup", function(){

    clearTimeout(timeout);
    const texto = this.value;

    if(texto.length < 2){
        document.getElementById("resultadosBusqueda").innerHTML = "";
        return;
    }

    timeout = setTimeout(async () => {
        try{
            // ✅ SOLO ESTE (correcto)
            const res = await fetch(`/api/productos/search?search=${texto}`);
            const productos = await res.json();
            renderResultados(productos);
        }catch(err){
            console.error(err);
        }
    }, 300);

});


// 🎯 RENDER RESULTADOS
function renderResultados(productos){

    const contenedor = document.getElementById("resultadosBusqueda");
    contenedor.innerHTML = "";

    if(productos.length === 0){
        contenedor.innerHTML = "<div class='search-item'>No hay resultados</div>";
        return;
    }

    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="search-item" onclick='seleccionarProducto(${JSON.stringify(p)})'>
                ${p.nombre} - $${p.precio}
            </div>
        `;
    });
}

function calcularTotales(){

    let subtotal = 0;

    carrito.forEach(item => {
        subtotal += item.subtotal;
    });

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    document.getElementById("subtotal").innerText = "$" + subtotal.toLocaleString();
    document.getElementById("iva").innerText = "$" + iva.toLocaleString();
    document.getElementById("total").innerText = "$" + total.toLocaleString();
}

// ✅ SELECCIONAR PRODUCTO
function seleccionarProducto(producto){

    document.getElementById("productoId").value = producto._id;
    document.getElementById("productoNombre").value = producto.nombre;
    document.getElementById("precio").value = producto.precio;

    document.getElementById("resultadosBusqueda").innerHTML = "";
}


function eliminarProducto(index){
    carrito.splice(index, 1);
    renderCarrito();
}

function renderCarrito(){

    const lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    carrito.forEach((item, index) => {
        lista.innerHTML += `
        <div class="order-item">
            <div>${item.nombre}</div>
            <div>Cant: ${item.cantidad}</div>
            <div>$${item.subtotal}</div>

            <button onclick="eliminarProducto(${index})" style="margin-left:10px; background:red; color:white;">
                X
            </button>
        </div>
        `;
    });

    calcularTotales(); // 🔥 IMPORTANTE
}

function agregarProducto(){

    const id = document.getElementById("productoId").value;
    const nombre = document.getElementById("productoNombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if(!id){
        alert("Selecciona un producto primero");
        return;
    }

    const existente = carrito.find(p => p.producto === id);

    if(existente){
        existente.cantidad += cantidad;
        existente.subtotal = existente.precio * existente.cantidad;
    }else{
        carrito.push({
            producto: id,
            nombre,
            precio,
            cantidad,
            subtotal: precio * cantidad
        });
    }

    renderCarrito();
}

// ❌ CERRAR RESULTADOS
document.addEventListener("click", function(e){
    if(!e.target.closest("#buscarProducto")){
        document.getElementById("resultadosBusqueda").innerHTML = "";
    }
});

async function finalizarVenta(){

    if(carrito.length === 0){
        alert("No hay productos en la venta");
        return;
    }

    try{

        const res = await fetch("/admin/finalizar-venta",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ carrito })
        });

        const data = await res.json();

        // 🔥 ahora sí rediriges a ruta que renderiza
        window.location = "/admin/confirmacion";

    }catch(err){
        console.error(err);
        alert("Error al finalizar venta");
    }
}




function cancelarVenta(){

    if(!confirm("¿Seguro que deseas cancelar la venta?")){
        return;
    }

    carrito = [];

    document.getElementById("listaProductos").innerHTML = "";

    document.getElementById("productoId").value = "";
    document.getElementById("productoNombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = 1;

    document.getElementById("subtotal").innerText = "$0";
    document.getElementById("iva").innerText = "$0";
    document.getElementById("total").innerText = "$0";
}