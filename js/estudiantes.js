let estudiantesCarga = -1;

document
    .getElementById("estudiantesForm")
    .addEventListener("submit", function (e) {
        if (estudiantesCarga === -1) {
            crear(e);
        } else {
            editar(e);
        }
    });

// Función para crear un nuevo estudiante
function crear(e) {
    // Valores de los campos del formulario
    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let dni = document.getElementById("inputDni").value;
    let fecha_de_nacimiento = document.getElementById("inputFecheNacimiento").value;
    let nacionalidad = document.getElementById("selectNacionalidad").value;
    let email = document.getElementById("inputMail").value;
    let celular = document.getElementById("inputCelular").value;

    // Verificar si los campos requeridos están vacíos
    if (
        nombre === "" ||
        apellido === "" ||
        dni === "" ||
        fecha_de_nacimiento === "" ||
        nacionalidad === "" ||
        email === "" ||
        celular === ""
    ) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Crear un objeto estudiante con los valores obtenidos
    let estudiante = {
        nombre,
        apellido,
        dni,
        fecha_de_nacimiento,
        nacionalidad,
        email,
        celular,
    };

    // Verificar si hay estudiantes en el localStorage
    let estudiantes = localStorage.getItem("estudiantes")
        ? JSON.parse(localStorage.getItem("estudiantes"))
        : [];

    // Agregar el estudiante al array y guardar los datos actualizados en el localStorage
    estudiantes.push(estudiante);
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    leer();

    // Restablecer el formulario
    document.getElementById("estudiantesForm").reset();

    // Evitar el envío del formulario y recarga de la página
    e.preventDefault();
}

// Función para editar un estudiante existente
function editar(e) {
    // Obtener los valores de los campos del formulario
    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById("inputApellido").value;
    let dni = document.getElementById("inputDni").value;
    let fecha_de_nacimiento = document.getElementById("inputFecheNacimiento").value;
    let nacionalidad = document.getElementById("selectNacionalidad").value;
    let email = document.getElementById("inputMail").value;
    let celular = document.getElementById("inputCelular").value;

    // Verificar si los campos requeridos están vacíos
    if (
        nombre === "" ||
        apellido === "" ||
        dni === "" ||
        fecha_de_nacimiento === "" ||
        nacionalidad === "" ||
        email === "" ||
        celular === ""
    ) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Obtener los datos del estudiante a editar
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes"));
    let estudianteActual = estudiantes[estudiantesCarga];

    // Actualizar los valores del estudiante en el array
    estudianteActual.nombre = nombre;
    estudianteActual.apellido = apellido;
    estudianteActual.dni = dni;
    estudianteActual.fecha_de_nacimiento = fecha_de_nacimiento;
    estudianteActual.nacionalidad = nacionalidad;
    estudianteActual.email = email;
    estudianteActual.celular = celular;

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    // Restablecer el formulario y el índice de edición
    document.getElementById("estudiantesForm").reset();
    estudiantesCarga = -1;

    // Volver a mostrar la tabla actualizada
    leer();

    // Cambiar el botón de enviar a "Crear"
    let botonEnviar = document.getElementById("btnEnviar");
    botonEnviar.innerText = "Crear";

    // Mostrar mensaje en la consola indicando que el estudiante se ha editado con éxito
    console.log("¡Estudiante editado con éxito!");

    // Evitar el envío del formulario y recarga de la página
    e.preventDefault();
}

// Función para llenar el formulario con los datos de un estudiante para editar
function llenarFormulario(student) {
    // Obtener los datos de los estudiantes del localStorage
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes"));

    // Obtener el estudiante correspondiente al índice dado
    let estudiante = estudiantes[student];

    // Llenar los campos del formulario con los datos del estudiante
    document.getElementById("inputNombre").value = estudiante.nombre;
    document.getElementById("inputApellido").value = estudiante.apellido;
    document.getElementById("inputDni").value = estudiante.dni;
    document.getElementById("inputFecheNacimiento").value = estudiante.fecha_de_nacimiento;
    document.getElementById("selectNacionalidad").value = estudiante.nacionalidad;
    document.getElementById("inputMail").value = estudiante.email;
    document.getElementById("inputCelular").value = estudiante.celular;

    // Guardar el índice de edición
    estudiantesCarga = student;

    // Cambiar el botón de enviar a "Guardar"
    let botonEnviar = document.getElementById("btnEnviar");
    botonEnviar.innerText = "Guardar";
}

function leer() {
    // Obtener los datos de los estudiantes del localStorage
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes"));

    // Limpiar el contenido actual de la tabla
    let tablaEstudiantes = document.getElementById("tablaEstudiantes");
    tablaEstudiantes.innerHTML = "";

    // Verificar si hay estudiantes para mostrar en la tabla
    if (estudiantes && estudiantes.length > 0) {
        // Iterar sobre cada estudiante y generar filas de tabla con sus datos
        for (let i = 0; i < estudiantes.length; i++) {
            let estudiante = estudiantes[i];
            tablaEstudiantes.innerHTML += `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.apellido}</td>
                <td>${estudiante.dni}</td>
                <td>${estudiante.fecha_de_nacimiento}</td>
                <td>${estudiante.nacionalidad}</td>
                <td>${estudiante.email}</td>
                <td>${estudiante.celular}</td>
                <td>
                <button class="btn btn-info btn-sm" onclick="llenarFormulario(${i})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminar(${i})">Eliminar</button>
                </td>
            </tr>`;
        }
    } else {
        // Si no hay estudiantes, mostrar un mensaje en la tabla
        tablaEstudiantes.innerHTML =
            "<tr><td colspan='8'>No hay estudiantes registrados.</td></tr>";
    }
}

// Función para eliminar un estudiante por su índice en el array
function eliminar(student) {
    // Obtener los datos de los estudiantes del localStorage
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes"));

    // Eliminar el estudiante del array por su índice
    estudiantes.splice(student, 1);

    // Guardar los datos actualizados en el localStorage
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    // Volver a mostrar la tabla actualizada
    leer();
}

// Buscador
$(document).ready(function() {
    // Obtener la referencia al campo de búsqueda y al botón de buscar
    var $buscarInput = $("#buscarInput");  
    // Manejar el evento de cambio en el campo de búsqueda
    $buscarInput.on("input", function() {
      // Obtener el valor del campo de búsqueda
      var query = $buscarInput.val().toLowerCase().trim();
  
      // Filtrar las filas de la tabla de estudiantes según la consulta
      $("#tablaEstudiantes tr").each(function() {
        var $row = $(this);
  
        // Obtener el valor de cada celda en la fila
        var nombre = $row.find("td:nth-child(1)").text().toLowerCase();
        var apellido = $row.find("td:nth-child(2)").text().toLowerCase();
        var dni = $row.find("td:nth-child(3)").text().toLowerCase();
  
        // Comprobar si la fila cumple con la consulta de búsqueda
        if (nombre.includes(query) || apellido.includes(query) || dni.includes(query)) {
          $row.show(); // Mostrar la fila si cumple con la consulta
        } else {
          $row.hide(); // Ocultar la fila si no cumple con la consulta
        }
      });
    });
});

// Cargar estudiantes al cargar la página
window.onload = leer;
