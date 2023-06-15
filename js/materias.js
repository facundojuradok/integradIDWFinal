
// Función para guardar una carrera en el LocalStorage
function guardarCarrera(carrera, descripcion, duracion) {

    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras.push({ carrera, descripcion, duracion });
    localStorage.setItem("carreras", JSON.stringify(carreras));
    cargarCarreras();
    actualizarSelectCarreras();
}

// Función para mostrar las carreras en la página
function cargarCarreras() {

    let carrerasDiv = document.getElementById("carreras");
    carrerasDiv.innerHTML = "";
    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras.forEach((carrera, index) => {
        let h1 = document.createElement("h1");
        h1.textContent = `Materias de ${carrera.carrera}`;
        carrerasDiv.appendChild(h1);

        let pDescripcion = document.createElement("p");
        pDescripcion.textContent = `Descripción: ${carrera.descripcion}`;
        carrerasDiv.appendChild(pDescripcion);

        let pDuracion = document.createElement("p");
        pDuracion.textContent = `Duración: ${carrera.duracion}`;
        carrerasDiv.appendChild(pDuracion);

        let editButton = document.createElement("button");
        editButton.textContent = "Editar Carrera";
        editButton.className = "btn btn-primary";
        editButton.addEventListener("click", () => editarCarrera(index));
        carrerasDiv.appendChild(editButton);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar Carrera";
        deleteButton.className = "btn btn-danger";
        deleteButton.addEventListener("click", () => eliminarCarrera(index));
        carrerasDiv.appendChild(deleteButton);

        let table = document.createElement("table");
        table.className = "table table-bordered";
        table.innerHTML = `
        <tr>
        <th>Nombre</th>
        <th>Carga Horaria</th>
        <th>Profesor Titular</th>
        <th>Profesor de Práctica</th>
        <th>Régimen</th>
        <th>Acciones</th>
        </tr>`;
        let materias = JSON.parse(localStorage.getItem("materias")) || [];
        materias.forEach((materia, materiaIndex) => {
            if (materia.carrera === carrera.carrera) {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${materia.nombre}</td>
                    <td>${materia.cargaHoraria}</td>
                    <td>${materia.profesorTitular}</td>
                    <td>${materia.profesorPractica}</td>
                    <td>${materia.regimen}</td>
                    <td>
                    <button class="btn btn-primary" onclick="editarMateria(${materiaIndex})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarMateria(${materiaIndex})">Eliminar</button>
                    </td>`;
                table.appendChild(tr);
            }
        });
        carrerasDiv.appendChild(table);
    });
}

// Función para editar una carrera en el LocalStorage
function editarCarrera(index) {

    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    let carrera = carreras[index];
    let modal = document.getElementById("editarCarreraModal");
    let nombreInput = document.getElementById("editarCarreraNombre");
    let descripcionInput = document.getElementById("editarCarreraDescripcion");
    let duracionInput = document.getElementById("editarCarreraDuracion");

    // Asignar los valores actuales de la carrera a los campos del modal
    nombreInput.value = carrera.carrera;
    descripcionInput.value = carrera.descripcion;
    duracionInput.value = carrera.duracion;

    // Mostrar el modal
    $(modal).modal("show");

    // Manejar el evento de guardar cambios del modal
    let guardarCambiosButton = document.getElementById("editarCarreraGuardar");
    guardarCambiosButton.addEventListener("click", function () {
        // Obtener los nuevos valores de los campos del modal
        let nuevoNombreCarrera = nombreInput.value;
        let nuevaDescripcion = descripcionInput.value;
        let nuevaDuracion = duracionInput.value;

        if (nuevoNombreCarrera && nuevaDescripcion && nuevaDuracion) {
            // Actualizar los datos de la carrera
            let antiguoNombreCarrera = carrera.carrera;
            carrera.carrera = nuevoNombreCarrera;
            carrera.descripcion = nuevaDescripcion;
            carrera.duracion = nuevaDuracion;

            localStorage.setItem("carreras", JSON.stringify(carreras));

            // Actualizar el nombre de la carrera en las materias asociadas
            let materias = JSON.parse(localStorage.getItem("materias")) || [];
            materias.forEach((materia) => {
                if (materia.carrera === antiguoNombreCarrera) {
                    materia.carrera = nuevoNombreCarrera;
                }
            });
            localStorage.setItem("materias", JSON.stringify(materias));

            cargarCarreras();
            actualizarSelectCarreras();
        }

        // Ocultar el modal después de guardar los cambios
        $(modal).modal("hide");
    });
}


// Función para eliminar una carrera del LocalStorage
function eliminarCarrera(index) {

    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras.splice(index, 1);
    localStorage.setItem("carreras", JSON.stringify(carreras));
    cargarCarreras();
    actualizarSelectCarreras();
}

// Función para guardar una materia en el LocalStorage
function guardarMateria(nombre,carrera,cargaHoraria,profesorTitular,profesorPractica,regimen) {

    let materias = JSON.parse(localStorage.getItem("materias")) || [];
    materias.push({
        nombre,
        carrera,
        cargaHoraria,
        profesorTitular,
        profesorPractica,
        regimen,
    });
    localStorage.setItem("materias", JSON.stringify(materias));
    cargarCarreras();
}

// Función para actualizar el select de carreras en el formulario de materias
function actualizarSelectCarreras() {

    let selectCarreras = document.getElementById("carreraPerteneciente");
    selectCarreras.innerHTML = "";
    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras.forEach((carrera) => {
        let option = document.createElement("option");
        option.value = carrera.carrera;
        option.textContent = carrera.carrera;
        selectCarreras.appendChild(option);
    });
}

// Función para editar una materia en el LocalStorage
function editarMateria(index) {

    let materias = JSON.parse(localStorage.getItem("materias")) || [];
    let materia = materias[index];

    // Obtener referencias a los elementos del modal
    let modal = document.getElementById("editarMateriaModal");
    let nombreInput = document.getElementById("editarMateriaNombre");
    let carreraInput = document.getElementById("editarMateriaCarrera");
    let cargaHorariaInput = document.getElementById("editarMateriaCargaHoraria");
    let profesorTitularInput = document.getElementById("editarMateriaProfesorTitular");
    let profesorPracticaInput = document.getElementById("editarMateriaProfesorPractica");
    let regimenInput = document.getElementById("editarMateriaRegimen");

    // Asignar los valores actuales de la materia a los campos del modal
    nombreInput.value = materia.nombre;
    cargaHorariaInput.value = materia.cargaHoraria;
    profesorTitularInput.value = materia.profesorTitular;
    profesorPracticaInput.value = materia.profesorPractica;
    regimenInput.value = materia.regimen;

    // Llenar el campo de selección de carrera en el modal
    actualizarSelectCarreras(carreraInput, materia.carrera);

    // Mostrar el modal
    $(modal).modal("show");

    // Manejar el evento de guardar cambios del modal
    let guardarCambiosButton = document.getElementById("editarMateriaGuardar");
    guardarCambiosButton.addEventListener("click", function () {
        // Obtener los nuevos valores de los campos del modal
        let nuevoNombre = nombreInput.value;
        let nuevaCarrera = carreraInput.value;
        let nuevaCargaHoraria = cargaHorariaInput.value;
        let nuevoProfesorTitular = profesorTitularInput.value;
        let nuevoProfesorPractica = profesorPracticaInput.value;
        let nuevoRegimen = regimenInput.value;

        if (
            nuevoNombre &&
            nuevaCarrera &&
            nuevaCargaHoraria &&
            nuevoProfesorTitular &&
            nuevoProfesorPractica &&
            nuevoRegimen
        ) {
            // Actualizar los datos de la materia
            materia.nombre = nuevoNombre;
            materia.carrera = nuevaCarrera;
            materia.cargaHoraria = nuevaCargaHoraria;
            materia.profesorTitular = nuevoProfesorTitular;
            materia.profesorPractica = nuevoProfesorPractica;
            materia.regimen = nuevoRegimen;

            localStorage.setItem("materias", JSON.stringify(materias));
            cargarCarreras();
        }

        // Ocultar el modal después de guardar los cambios
        $(modal).modal("hide");
    });
}

// Función para actualizar el select de carreras en el formulario de materias
function actualizarSelectCarreras() {

    let selectCarreras = document.getElementById("carreraPerteneciente");
    selectCarreras.innerHTML = "";
    let carreras = JSON.parse(localStorage.getItem("carreras")) || [];
    carreras.forEach((carrera) => {
        let option = document.createElement("option");
        option.value = carrera.carrera;
        option.textContent = carrera.carrera;
        selectCarreras.appendChild(option);
    });
}

// Función para eliminar una materia del LocalStorage
function eliminarMateria(index) {

    let materias = JSON.parse(localStorage.getItem("materias")) || [];
    materias.splice(index, 1);
    localStorage.setItem("materias", JSON.stringify(materias));
    cargarCarreras();
}

// Guarda una Carrera y luego limpia el formulario.
document.getElementById("carreraForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let carrera = document.getElementById("carrera").value;
        let descripcion = document.getElementById("descripcion").value;
        let duracion = document.getElementById("duracion").value;
        guardarCarrera(carrera, descripcion, duracion);
        this.reset();
    });

// Guarda una materia y luego limpia el formulario.
document.getElementById("materiaForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let nombre = document.getElementById("nombreMateria").value;
        let carrera = document.getElementById("carreraPerteneciente").value;
        let cargaHoraria = document.getElementById("cargaHoraria").value;
        let profesorTitular = document.getElementById("profesorTitular").value;
        let profesorPractica = document.getElementById("profesorPractica").value;
        let regimen = document.getElementById("regimen").value;
        guardarMateria(
            nombre,
            carrera,
            cargaHoraria,
            profesorTitular,
            profesorPractica,
            regimen
        );
        this.reset();
    });

// Cargar las carreras y actualizar el select de carreras al cargar la página
cargarCarreras();
actualizarSelectCarreras();
