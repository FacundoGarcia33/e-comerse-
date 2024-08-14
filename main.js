// Productos del carrito
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let cantidadEnCarrito = productos.length;

// Dandole valor a los botones 
let producto1 = document.querySelector(".producto1");
let producto2 = document.querySelector(".producto2");
let producto3 = document.querySelector(".producto3");
let producto4 = document.querySelector(".producto4");
let producto5 = document.querySelector(".producto5");
let producto6 = document.querySelector(".producto6");
let producto7 = document.querySelector(".producto7");
let producto8 = document.querySelector(".producto8");
let mostrarCarrito = document.querySelector("#mostrar-carrito");
let sacarProducto = document.querySelector("#sacarproducto");
let eliminarProducto = document.querySelector("#eliminar-carrito"); 
let productosCantidad = document.querySelector("#productos-cantidad");
let carritoContenido = document.querySelector("#carrito-contenido");

// Inicializar la cantidad del carrito
actualizarCantidad();

// Dandole eventos a los botones 
producto1.addEventListener("click", () => agregarProducto({ nombre: "teclado gamer", precio: 50.000 }));
producto2.addEventListener("click", () => agregarProducto({ nombre: "monitor de 1000 pulgadas", precio: 150.000 }));
producto3.addEventListener("click", () => agregarProducto({ nombre: "mouse gamer", precio: 30.000 }));
producto4.addEventListener("click", () => agregarProducto({ nombre: "Pc gamer de 4gb", precio: 600.000 }));
producto5.addEventListener("click", () => agregarProducto({ nombre: "Teclado + mouse brb", precio: 65.000 }));
producto6.addEventListener("click", () => agregarProducto({ nombre: "Parlante jdb box box-3", precio: 550.000 }));
producto7.addEventListener("click", () => agregarProducto({ nombre: "Parlante jdb box box-3 camuflado", precio: 570.000 }));
producto8.addEventListener("click", () => agregarProducto({ nombre: "Silla Gamer reclinable", precio: 250.000 }));

mostrarCarrito.addEventListener("click", () => {
    // Generar el mensaje del carrito
    let mensajeCarrito = generarMensajeCarrito();
    // Mostrar el mensaje en una alerta
    alert(mensajeCarrito);
});

sacarProducto.addEventListener("click", () => {
    if (cantidadEnCarrito > 0) { 
        let productoEliminado = productos.pop(); 
        cantidadEnCarrito--; 
        actualizarCantidad();
        alert("Se eliminó el último producto: " + (productoEliminado ? productoEliminado.nombre : "ninguno"));
        actualizarLocalStorage();
    } else {
        alert("No hay productos en el carrito para eliminar.");
    }
});

eliminarProducto.addEventListener("click", () => {
    vaciarCarrito();
    alert("El carrito fue vaciado.");
});

// Funciones 
function actualizarCantidad() {
    // Actualiza el número en el botón
    productosCantidad.textContent = cantidadEnCarrito; 
}

function vaciarCarrito() {
    productos.length = 0; 
    cantidadEnCarrito = 0; // Reiniciar la cantidad
    actualizarCantidad(); // Actualizar la visualización
    actualizarLocalStorage();
}

function agregarProducto(producto) {
    productos.push(producto);
    cantidadEnCarrito++;
    actualizarCantidad();
    alert("Se agregó al carrito: " + producto.nombre);
    actualizarLocalStorage();
}

function actualizarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function generarMensajeCarrito() {
    // Inicializar la variable para el mensaje
    let mensaje = "Productos en el carrito:\n";
    let total = 0;

    // Recorremos el array de productos para construir el mensaje
    productos.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
        total += producto.precio;
    });

    // Agregar el total al mensaje
    mensaje += `\nTotal: $${total.toFixed(2)}`;

    return mensaje;
}
