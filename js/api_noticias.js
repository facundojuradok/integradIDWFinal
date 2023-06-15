let key = `eb7d015056134f8fb7b5848971f21edb`; // Api Key.
let url = `https://newsapi.org/v2/everything?q=apple&from=2023-06-12&to=2023-06-12&sortBy=popularity&apiKey=${key}`; 
let mostrar_noticias = document.getElementById(`noticias`);
let contador = 0;
let totalNoticias = 10;
let noticiasCargadas = 0;

function cargarNoticias() {
    fetch(url).then((resp) => resp.json()).then((dato) => {
        console.log(dato);
        let noticias = dato.articles;
        noticiasCargadas = noticias.length;
        noticias.slice(contador, contador + totalNoticias).map(function (numero) {
            let div = document.createElement(`div`);
            div.className = 'col-md-4';
            div.innerHTML = `<div class="card">
                            <img class="card-img-top" src=${numero.urlToImage} alt="Noticia">
                            <div class="card-body">
                            <h5 class="card-title">${numero.title}</h5>
                            <p class="card-text">${numero.description}</p>
                            <a href="${numero.url}" class="btn btn-primary" target="_blank">Leer más</a>
                            </div>
                            </div>`;
        mostrar_noticias.appendChild(div);
        contador++;
    });

        if (contador >= noticiasCargadas) {
            document.getElementById("mostrar-mas").style.display = "none";
            document.getElementById("mensaje-fin").style.display = "block";
        }
    });
}

cargarNoticias();

document.getElementById("mostrar-mas").addEventListener("click", function () {
cargarNoticias();
});