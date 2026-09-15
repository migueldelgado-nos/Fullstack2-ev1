
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
            !correo.endsWith("@profesor.duoc.cl") &&
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

        alert("Registro realizado correctamente");

    });

}


// VALIDACIÓN AGENDAR CITA

const formCita = document.getElementById("formCita");

if (formCita) {

    formCita.addEventListener("submit", function (event) {

        event.preventDefault();

        const servicio = document.getElementById("servicio").value;
        const nutricionista = document.getElementById("nutricionista").value;
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;
        const motivo = document.getElementById("motivo").value.trim();

        if (servicio === "Seleccionar") {
            alert("Debe seleccionar un tipo de atención");
            return;
        }

        if (nutricionista === "Seleccionar") {
            alert("Debe seleccionar un nutricionista");
            return;
        }

        if (fecha === "") {
            alert("Debe seleccionar una fecha");
            return;
        }

        if (hora === "") {
            alert("Debe seleccionar una hora");
            return;
        }

        if (motivo === "") {
            alert("Debe ingresar el motivo de la consulta");
            return;
        }

        alert("Cita agendada correctamente");

    });

}