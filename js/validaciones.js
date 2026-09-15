// menu desplegable de formularios en vista nutricionista
const tipoFormulario = document.getElementById("tipoFormulario");

const formularioDatos = document.getElementById("formularioDatos");
const formularioDatosForm = document.getElementById("formulario-datos");
const formularioAlimentacion = document.getElementById("formularioAlimentacion");
const formularioAlimentacionForm = document.getElementById("formulario-alimentacion")

tipoFormulario.addEventListener("change", function () {

    if (tipoFormulario.value === "formularioDatos") {

        formularioDatos.classList.remove("d-none");
        formularioAlimentacion.classList.add("d-none");

    } else {

        formularioDatos.classList.add("d-none");
        formularioAlimentacion.classList.remove("d-none");

    }

});

//Boton formulario de paciente en vista nutricionista

