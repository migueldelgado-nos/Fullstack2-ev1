// menu desplegable de formularios en vista nutricionista
const tipoFormulario = document.getElementById("tipoFormulario");

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
const mensajeResultado = document.getElementById("mensaje-resultado");

const campoDesayuno=document.getElementById("desayuno");
const campoColacion=document.getElementById("colacion1");
const campoAlmuerzo=document.getElementById("almuerzo");
const campoColacionTarde=document.getElementById("colacion2");
const campoCena=document.getElementById("cena");
const campoObservaciones=document.getElementById("observaciones");

tipoFormulario.addEventListener("change", function () {
    if (tipoFormulario.value === "datos") {
        formularioDatos.classList.remove("d-none");
        formularioAlimentacion.classList.add("d-none");

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
        mensajeResultado.textContent = "Debe completar todos los campos";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }
    mensajeResultado.className = "alert alert-success mt-4";

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
        mensajeResultado.textContent = "Debe completar todos los campos";
        mensajeResultado.className = "alert alert-danger mt-4";
        return;
    }
    mensajeResultado.className = "alert alert-success mt-4";

    formularioAlimentacionForm.reset();
});
//Boton formulario de paciente en vista nutricionista

