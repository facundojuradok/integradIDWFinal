// Obtén el contenedor en el que mostrar los datos del contacto
var contactoContainer = document.getElementById('contacto-container');

// Obtiene los datos de los contactos almacenados en el localStorage
var contactosJSON = localStorage.getItem('contacto');

// Verifica si existen datos de contacto guardados en el localStorage
if (contactosJSON && JSON.parse(contactosJSON).length > 0) {
    // Parsea los datos JSON a un arreglo de objetos JavaScript
    var contactos = JSON.parse(contactosJSON);

    // Crea el contenido HTML para mostrar los datos de cada contacto
    var contenidoHTML = '';
    for (var i = 0; i < contactos.length; i++) {
    var contacto = contactos[i];
    contenidoHTML += `
        <div class="col-md-4">
        <div class="card mb-4">
            <div class="card-body">
            <h5 class="card-title">${contacto.nombre} ${contacto.apellido}</h5>
            <p class="card-text"><strong>Asunto:</strong> ${contacto.asunto}</p>
            <p class="card-text"><strong>Email:</strong> ${contacto.email}</p>
            <p class="card-text"><strong>Teléfono:</strong> ${contacto.telefono}</p>
            <p class="card-text"><strong>Mensaje:</strong> ${contacto.mensaje}</p>
            <button class="btn btn-danger" onclick="borrarMensaje(${i})">Borrar mensaje</button>
            </div>
        </div>
        </div>
    `;
    }

    // Agrega el contenido HTML al contenedor
    contactoContainer.innerHTML = contenidoHTML;
} else {
    // Si no hay datos de contacto, muestra un mensaje alternativo
    contactoContainer.innerHTML = '<p>No hay mensajes pendientes por leer.</p>';
}

// Función para borrar un mensaje del localStorage
function borrarMensaje(index) {
    // Obtiene los contactos del localStorage
    var contactosJSON = localStorage.getItem('contacto');
    var contactos = [];
    if (contactosJSON) {
    contactos = JSON.parse(contactosJSON);
    }
    
    // Remueve el mensaje del arreglo de contactos
    contactos.splice(index, 1);
    
    // Actualiza el localStorage con los contactos actualizados
    var contactosActualizadosJSON = JSON.stringify(contactos);
    localStorage.setItem('contacto', contactosActualizadosJSON);
    
    // Vuelve a cargar la página para reflejar los cambios
    location.reload();
}