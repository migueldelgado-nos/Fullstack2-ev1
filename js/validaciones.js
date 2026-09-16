// VALIDACIÓN REGISTRO DE USUARIO
const tipoFormulario = document.getElementById("tipoFormulario");
const formRegistro = document.getElementById("formRegistro");
const formularioDatos = document.getElementById("formularioDatos");
const formularioDatosForm = document.getElementById("formulario-datos");
const formularioAlimentacion = document.getElementById("formularioAlimentacion");
const formularioAlimentacionForm = document.getElementById("formulario-alimentacion");
const campoNombre =document.getElementById("nombre");
const campoEdad = document.getElementById("edad");
const campoSexo = document.getElementById("sexo");
const campoPeso = document.getElementById("peso");
const campoTallaCintura = document.getElementById("cintura");
const campoAltura = document.getElementById("altura");
const campoGrasaCorporal = document.getElementById("grasa");
const mensajeResultado1 = document.getElementById("mensaje-resultado1");
const mensajeResultado2 = document.getElementById("mensaje-resultado2");
const campoDesayuno=document.getElementById("desayuno");
const campoColacion=document.getElementById("colacion1");
const campoAlmuerzo=document.getElementById("almuerzo");
const campoColacionTarde=document.getElementById("colacion2");
const campoCena=document.getElementById("cena");
const campoObservaciones=document.getElementById("observaciones");
const campoRun=document.getElementById("run");
const campoApellidos=document.getElementById("apellidos");
const campoCorreo=document.getElementById("correo");
const campoRegion=document.getElementById("region");
const campoComuna=document.getElementById("comuna");
const campoDireccion=document.getElementById("direccion");
const campoPassword=document.getElementById("password");
const campoValidacionPassword=document.getElementById("validacion-password");

if (formRegistro) {

    formRegistro.addEventListener("submit", function (event) {

        event.preventDefault();

        const run = campoRun.value.trim();
        const nombre = campoNombre.value.trim();
        const apellidos = campoApellidos.value.trim();
        const correo = campoCorreo.value.trim();
        const region = campoRegion.value;
        const comuna = campoComuna.value;
        const direccion = campoDireccion.value.trim();
        const password = campoPassword.value.trim();
        const validacionPassword = campoValidacionPassword.value.trim();

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
        if (/\d/.test(nombre)){
            event.preventDefault();
            alert("El nombre no puede tener numeros");
            return;
        }

        if (apellidos === "") {
            alert("Debe ingresar los apellidos");
            return;
        }
        if (/\d/.test(apellidos)){
            event.preventDefault();
            alert("Los apellidos no pueden tener numeros");
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

        if (password === "" || validacionPassword === "") {
            alert("Debe ingresar una contraseña y/o validar su contraseña");
            return;
        }

        if (password.length < 4 || password.length > 10) {
            alert("La contraseña debe tener entre 4 y 10 caracteres");
            return;
        }

        if (password !== validacionPassword) {
            event.preventDefault();
            alert("Las contraseñas no coinciden");
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


tipoFormulario.addEventListener("change", function () {
    if (tipoFormulario.value === "datos") {
        formularioDatos.classList.remove("d-none");
        formularioAlimentacion.classList.add("d-none");

    } else {
    } 
    if (tipoFormulario.value === "alimentacion"){

        formularioDatos.classList.add("d-none");
        formularioAlimentacion.classList.remove("d-none");

    }

});

formularioDatosForm.addEventListener("submit",function(evento){
    evento.preventDefault();
    const nombre = campoNombre.value.trim();
    const edad = Number(campoEdad.value);
    const sexo = campoSexo.value;
    const peso = Number(campoEdad.value);
    const tallaCintura = Number(campoTallaCintura.value);
    const altura = Number(campoAltura.value);
    const grasaCorporal = Number(campoGrasaCorporal.value);
    if (
        nombre ==="" ||
        edad ==="" ||
        sexo ==="" ||
        peso ==="" ||
        tallaCintura ==="" ||
        altura ==="" ||
        grasaCorporal ==="" 
    )
    {
        mensajeResultado1.textContent = "Debe completar todos los campos";
        mensajeResultado1.className = "alert alert-danger mt-4";
        return;
    }
    mensajeResultado1.className = "alert alert-success mt-4";

    formularioDatosForm.reset();
});
formularioAlimentacionForm.addEventListener("submit",function(evento){
    evento.preventDefault();
    const desayuno = campoDesayuno.value.trim();
    const colacion1 = campoColacion.value.trim();
    const almuerzo = campoAlmuerzo.value.trim();
    const colacion2 = campoColacionTarde.value.trim();
    const cena = campoCena.value.trim();
    const observaciones = campoObservaciones.value.trim();
    if (
        desayuno ==="" ||
        colacion1 ==="" ||
        almuerzo ==="" ||
        colacion2 ==="" ||
        cena ==="" ||
        observaciones ===""
    )
    {
        mensajeResultado2.textContent = "Debe completar todos los campos";
        mensajeResultado2.className = "alert alert-danger mt-4";
        return;
    }
    mensajeResultado2.className = "alert alert-success mt-4";

    formularioAlimentacionForm.reset();
});
//Boton formulario de paciente en vista nutricionista

