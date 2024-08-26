// Productos del carrito
let productos = JSON.parse(localStorage.getItem("productos")) || [];
let cantidadEnCarrito = productos.length;

// Dando valor a los botones 
const producto1 = document.querySelector(".producto1");
const producto2 = document.querySelector(".producto2");
const producto3 = document.querySelector(".producto3");
const producto4 = document.querySelector(".producto4");
const producto5 = document.querySelector(".producto5");
const producto6 = document.querySelector(".producto6");
const producto7 = document.querySelector(".producto7");
const producto8 = document.querySelector(".producto8");
const mostrarCarrito = document.querySelector("#mostrar-carrito");
const sacarProducto = document.querySelector("#sacarproducto");
const eliminarProducto = document.querySelector("#eliminar-carrito"); 
const productosCantidad = document.querySelector("#productos-cantidad");

// Inicializar cantidad del carrito
actualizarCantidad();

// Asignar eventos a los botones de productos
producto1.addEventListener("click", () => agregarProducto({ nombre: "Teclado gamer", precio: 50.00 }));
producto2.addEventListener("click", () => agregarProducto({ nombre: "Monitor de 1000 pulgadas", precio: 150.00 }));
producto3.addEventListener("click", () => agregarProducto({ nombre: "Mouse gamer", precio: 30.00 }));
producto4.addEventListener("click", () => agregarProducto({ nombre: "PC gamer de 4GB", precio: 600.00 }));
producto5.addEventListener("click", () => agregarProducto({ nombre: "Teclado + mouse BRB", precio: 65.00 }));
producto6.addEventListener("click", () => agregarProducto({ nombre: "Parlante JDB Box Box-3", precio: 550.00 }));
producto7.addEventListener("click", () => agregarProducto({ nombre: "Parlante JDB Box Box-3 camuflado", precio: 570.00 }));
producto8.addEventListener("click", () => agregarProducto({ nombre: "Silla gamer reclinable", precio: 250.00 }));

// Mostrar carrito
mostrarCarrito.addEventListener("click", () => {
    let mensajeCarrito = CrearMensaje();
    Swal.fire({
        title: "Productos en el carrito",
        html: mensajeCarrito.replace(/\n/g, "<br>"),
        icon: "info",
        confirmButtonText: "Cerrar"
    });
});

// Sacar producto
sacarProducto.addEventListener("click", () => {
    if (cantidadEnCarrito > 0) { 
        let productoEliminado = productos.pop(); 
        cantidadEnCarrito--; 
        actualizarCantidad();
        Swal.fire({
            icon: "success",
            title: "¡Producto eliminado!",
            text: "Se eliminó el último producto: " + (productoEliminado ? productoEliminado.nombre : "ninguno"),
        });
        actualizarLocalStorage();
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No hay productos en el carrito para eliminar.",
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
        });
    }
});

// Eliminar todos los productos del carrito
eliminarProducto.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro que quieres vaciar el carrito?",
        text: "¡No podrás revertir la opción!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar"
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            Swal.fire({
                title: "¡Vaciado!",
                text: "Tu carrito fue vaciado.",
                icon: "success"
            });
        }
    });
});

// Funciones 
function actualizarCantidad() {
    productosCantidad.textContent = cantidadEnCarrito; 
}

function vaciarCarrito() {
    productos.length = 0; 
    cantidadEnCarrito = 0;
    actualizarCantidad(); 
    actualizarLocalStorage();
}

function agregarProducto(producto) {
    productos.push(producto);
    cantidadEnCarrito++;
    actualizarCantidad();
    Swal.fire({
        title: "¡Se agregó el producto al carrito!",
        icon: "success"
    });
    actualizarLocalStorage();
}

function actualizarLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function CrearMensaje() {
    let mensaje = "Productos en el carrito:\n";
    let total = 0;
    productos.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio.toFixed(2)}\n`;
        total += producto.precio;
    });
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    return mensaje;
}


fetch("./js/productos.json")
    .then(ac => ac.json())
    .then(pro => {
        console.log(pro);
    })    