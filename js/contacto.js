var form = document.getElementById('contactForm');
form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    // Valores de los campos del formulario
    var nombre = form.nombre.value;
    var apellido = form.apellido.value;
    var asunto = form.asunto.value;
    var email = form.email.value;
    var telefono = form.telefono.value;
    var mensaje = form.mensaje.value;

    // Objeto con los datos del formulario
    var contacto = {
        nombre: nombre,
        apellido: apellido,
        asunto: asunto,
        email: email,
        telefono: telefono,
        mensaje: mensaje
    };

    // Obtiene los contactos previamente almacenados en el localStorage
    var contactosJSON = localStorage.getItem('contacto');
    var contactos = [];
    if (contactosJSON) {
        try {
            // Intenta parsear los datos JSON a un arreglo de objetos JavaScript
            contactos = JSON.parse(contactosJSON);
            if (!Array.isArray(contactos)) {
                // Si el contenido no es un arreglo válido, inicializa contactos como un arreglo vacío
                contactos = [];
            }
        } catch (error) {
            // Si hay algún error al parsear los datos JSON, inicializa contactos como un arreglo vacío
            contactos = [];
        }
    }

    
    contactos.push(contacto);// Agrega el nuevo contacto al arreglo

    var contactosActualizadosJSON = JSON.stringify(contactos);// Convierte el arreglo de contactos en una cadena JSON

    localStorage.setItem('contacto', contactosActualizadosJSON);// Guarda la cadena JSON actualizada en el localStorage bajo la key "contacto"


    
    form.reset();// Limpia los campos del formulario después de guardar los datos

    alert('Mensaje enviado correctamente.');
});

