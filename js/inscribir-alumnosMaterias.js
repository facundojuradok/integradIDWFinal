var inputBuscador = document.getElementById("buscador");
var resultadoBusqueda = document.getElementById("resultadoBusqueda");
var selectCarreras = document.getElementById("selectCarreras");
var divCarreras = document.getElementById("divCarreras");
var materiasCarrera = document.getElementById("materiasCarrera");
var inscribirBtn = document.getElementById("inscribirBtn");
var errorEstudiantes = document.getElementById("errorEstudiantes");
var errorMaterias = document.getElementById("errorMaterias");
var estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
var inscripciones = JSON.parse(localStorage.getItem("inscripciones")) || [];

inputBuscador.addEventListener("input", function () {
  var valorBusqueda = inputBuscador.value.toLowerCase();
  resultadoBusqueda.innerHTML = "";

  if (valorBusqueda.trim().length === 0) {
    divCarreras.style.display = "none";
    selectCarreras.selectedIndex = -1;
    materiasCarrera.style.display = "none";
    return; // Salir de la función si el campo de búsqueda está vacío
  }

  for (var j = 0; j < estudiantes.length; j++) {
    var estudiante = estudiantes[j];
    var nombreCompleto = estudiante.nombre + " " + estudiante.apellido;
    var dni = estudiante.dni;

    if (
      nombreCompleto.toLowerCase().includes(valorBusqueda) ||
      dni.includes(valorBusqueda)
    ) {
      var li = document.createElement("li");

      var checkboxEstudiante = document.createElement("input");
      checkboxEstudiante.type = "checkbox";
      checkboxEstudiante.value = dni;
      checkboxEstudiante.id = "estudiante_" + j;

      var labelEstudiante = document.createElement("label");
      labelEstudiante.setAttribute("for", "estudiante_" + j);
      labelEstudiante.textContent = nombreCompleto + " - DNI: " + dni;

      li.appendChild(checkboxEstudiante);
      li.appendChild(labelEstudiante);
      resultadoBusqueda.appendChild(li);
    }
  }

  // Verificar si hay resultados en la lista
  if (resultadoBusqueda.children.length > 0) {
    divCarreras.style.display = "block";
  } else {
    divCarreras.style.display = "none";
    selectCarreras.selectedIndex = -1; // Reiniciar el valor seleccionado del select
    materiasCarrera.style.display = "none";
    materiasCarrera.innerHTML = "";
  }
});

// Obtener y mostrar las carreras en el select
var carrerasData = JSON.parse(localStorage.getItem("carreras")) || [];

// Obtener y mostrar las materias en el select
var materiasData = JSON.parse(localStorage.getItem("materias")) || [];

// Agregar la opción predeterminada al select de carreras
var optionPredeterminada = document.createElement("option");
optionPredeterminada.value = "";
optionPredeterminada.textContent = "Elegí la carrera";
selectCarreras.appendChild(optionPredeterminada);

// Agregar las opciones de carrera al select
for (var i = 0; i < carrerasData.length; i++) {
  var carrera = carrerasData[i].carrera;
  var optionCarrera = document.createElement("option");
  optionCarrera.value = carrera;
  optionCarrera.textContent = carrera;
  selectCarreras.appendChild(optionCarrera);
}

// Evento de cambio en el select de carreras
selectCarreras.addEventListener("change", function () {
  var seleccionada = selectCarreras.value;
  materiasCarrera.innerHTML = "";

  if (seleccionada) {
    var materias = materiasData.filter(function (materia) {
      return materia.carrera === seleccionada;
    });

    for (var k = 0; k < materias.length; k++) {
      var materia = materias[k];
      var checkboxMateria = document.createElement("input");
      checkboxMateria.type = "checkbox";
      checkboxMateria.value = materia.nombre;
      checkboxMateria.id = "materia_" + k;

      var labelMateria = document.createElement("label");
      labelMateria.setAttribute("for", "materia_" + k);
      labelMateria.textContent = materia.nombre;

      materiasCarrera.appendChild(checkboxMateria);
      materiasCarrera.appendChild(labelMateria);
      materiasCarrera.appendChild(document.createElement("br"));
    }

    materiasCarrera.style.display = "block";
    errorMaterias.style.display = "none";
  } else {
    materiasCarrera.style.display = "none";
    errorMaterias.style.display = "block";
  }
});

inscribirBtn.addEventListener("click", function () {
  var checkboxesEstudiantes = resultadoBusqueda.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  var checkboxesMaterias = materiasCarrera.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  if (checkboxesEstudiantes.length === 0) {
    errorEstudiantes.style.display = "block";
  } else {
    errorEstudiantes.style.display = "none";
  }

  if (checkboxesMaterias.length === 0) {
    errorMaterias.style.display = "block";
  } else {
    errorMaterias.style.display = "none";
  }

  if (
    checkboxesEstudiantes.length > 0 &&
    checkboxesMaterias.length > 0
  ) {
    for (var m = 0; m < checkboxesEstudiantes.length; m++) {
      var dni = checkboxesEstudiantes[m].value;
      var estudiante = estudiantes.find(function (e) {
        return e.dni === dni;
      });

      for (var n = 0; n < checkboxesMaterias.length; n++) {
        var materia = checkboxesMaterias[n].value;

        var inscripcion = {
          nombre: estudiante.nombre,
          apellido: estudiante.apellido,
          dni: estudiante.dni,
          carrera: selectCarreras.value,
          materia: materia
        };

        inscripciones.push(inscripcion);
      }
    }

    localStorage.setItem("inscripciones", JSON.stringify(inscripciones));

    // Reiniciar formulario
    inputBuscador.value = "";
    resultadoBusqueda.innerHTML = "";
    divCarreras.style.display = "none";
    selectCarreras.selectedIndex = -1;
    materiasCarrera.style.display = "none";
    materiasCarrera.innerHTML = "";
    errorEstudiantes.style.display = "none";
    errorMaterias.style.display = "none";

    // Mostrar mensaje de éxito
    alert("Inscripción realizada con éxito");
  }
});
