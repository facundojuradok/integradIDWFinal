function cargarCarreras() {
    var inscripcionData = localStorage.getItem('inscripciones');
    if (inscripcionData) {
        var inscripciones = JSON.parse(inscripcionData);
        var carreraSelect = document.getElementById('carreraSelect');
        carreraSelect.innerHTML = '';

        var option = document.createElement('option');
        option.value = ''; // Valor vacío
        option.text = '-- Selecciona una carrera --';
        carreraSelect.appendChild(option);

        var carreras = inscripciones.map(entry => entry.carrera);
        var uniqueCarreras = [...new Set(carreras)]; // Eliminar duplicados

        for (var i = 0; i < uniqueCarreras.length; i++) {
            var carrera = uniqueCarreras[i];
            var option = document.createElement('option');
            option.value = carrera; // Utilizar el nombre de la carrera como valor
            option.text = carrera;
            carreraSelect.appendChild(option);
        }
    }
}

function cargarMaterias() {
    var carreraSelect = document.getElementById('carreraSelect');
    var carrera = carreraSelect.value;
    var inscripcionData = localStorage.getItem('inscripciones');
    if (inscripcionData) {
        var inscripciones = JSON.parse(inscripcionData);
        var materiaSelect = document.getElementById('materiaSelect');
        materiaSelect.innerHTML = '';

        if (carrera) {
            var materias = [];

            for (var i = 0; i < inscripciones.length; i++) {
                var inscripcion = inscripciones[i];
                if (inscripcion.carrera === carrera) {
                    materias.push(inscripcion.materia);
                }
            }

            var uniqueMaterias = [...new Set(materias)]; // Eliminar duplicados

            for (var i = 0; i < uniqueMaterias.length; i++) {
                var materia = uniqueMaterias[i];
                var option = document.createElement('option');
                option.value = materia;
                option.text = materia;
                materiaSelect.appendChild(option);
            }
        }
    }
}

function filtrarEstudiantes() {
    var materiaSelect = document.getElementById('materiaSelect');
    var materia = materiaSelect.value;
    var carreraSelect = document.getElementById('carreraSelect');
    var carrera = carreraSelect.value;
    var inscripcionData = localStorage.getItem('inscripciones');

    if (inscripcionData) {
        var inscripciones = JSON.parse(inscripcionData);
        var estudiantesMaterias = {}; // Objeto para almacenar estudiantes y sus materias

        for (var i = 0; i < inscripciones.length; i++) {
            var inscripcion = inscripciones[i];
            if (inscripcion.carrera === carrera) {
                var materiaEstudiante = inscripcion.materia;
                var estudiante = inscripcion.nombre + " " + inscripcion.apellido + " - DNI: " + inscripcion.dni;

                // Almacenar cada estudiante con su materia correspondiente
                if (!estudiantesMaterias.hasOwnProperty(estudiante)) {
                    estudiantesMaterias[estudiante] = [];
                }
                estudiantesMaterias[estudiante].push(materiaEstudiante);
            }
        }

        var resultadoEstudiantes = document.getElementById('resultadoEstudiantes');
        var totalEstudiantes = document.getElementById('totalEstudiantes');
        resultadoEstudiantes.innerHTML = '';

        var total = 0;

        // Iterar sobre los estudiantes y mostrar aquellos que tengan la materia seleccionada
        for (var estudiante in estudiantesMaterias) {
            if (estudiantesMaterias.hasOwnProperty(estudiante)) {
                var materiasEstudiante = estudiantesMaterias[estudiante];
                if (materiasEstudiante.includes(materia)) {
                    var listItem = document.createElement('li');
                    listItem.appendChild(document.createTextNode(estudiante));
                    resultadoEstudiantes.appendChild(listItem);
                    total++;
                }
            }
        }

        totalEstudiantes.innerHTML = "Total de estudiantes: " + total;
    }
}


cargarCarreras();
