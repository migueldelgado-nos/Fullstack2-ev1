// VALIDACIÓN REGISTRO DE USUARIO

const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {

    formRegistro.addEventListener("submit", function (event) {

        event.preventDefault();

        const run = document.getElementById("run").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;
        const direccion = document.getElementById("direccion").value.trim();
        const password = document.getElementById("password").value.trim();

        if (run === "") {
            alert("Debe ingresar el RUN");
            return;
        }

        if (run.length < 7 || run.length > 9) {
            alert("El RUN debe tener entre 7 y 9 caracteres");
            return;
        }

        if (nombre === "") {
            alert("Debe ingresar el nombre");
            return;
        }

        if (apellidos === "") {
            alert("Debe ingresar los apellidos");
            return;
        }

        if (correo === "") {
            alert("Debe ingresar el correo electrónico");
            return;
        }

        if (
            !correo.endsWith("@duoc.cl") &&
            !correo.endsWith("@gmail.com")
        ) {
            alert("El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com");
            return;
        }

        if (region === "Seleccionar") {
            alert("Debe seleccionar una región");
            return;
        }

        if (comuna === "Seleccionar") {
            alert("Debe seleccionar una comuna");
            return;
        }

        if (direccion === "") {
            alert("Debe ingresar la dirección");
            return;
        }

        if (password === "") {
            alert("Debe ingresar una contraseña");
            return;
        }

        if (password.length < 4 || password.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres");
            return;
        }

        const mensajeExito = document.getElementById("mensajeExito");

        mensajeExito.textContent = "Registro realizado correctamente";

        formRegistro.reset();

    });

}

// CARRITO DE COMPRAS

const botonesCarrito = document.querySelectorAll(".agregar-carrito");

const cantidadCarrito = document.getElementById("cantidadCarrito");
const totalCarrito = document.getElementById("totalCarrito");

let cantidad = 0;
let total = 0;

botonesCarrito.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);

        cantidad = cantidad + 1;
        total = total + precio;

        cantidadCarrito.textContent = cantidad;

        totalCarrito.textContent = total.toLocaleString("es-CL");

        console.log(nombre + " agregado al carrito");

    });

});
