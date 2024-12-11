document.addEventListener("DOMContentLoaded", function () {
    // Cargar el contenido del menú lateral
    fetch("menu.html")
    .then((response) => response.text())
    .then((data) => {
    // Insertar el menú en el contenedor
    document.getElementById("menu-container2").innerHTML = data;

    // Detectar la página actual
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Nombre del archivo

    // Marcar como activo el ítem correspondiente
    if (page === "client.html") {
        document.getElementById("home-link").classList.add("active");
    } else if (page === "way.html") {
        document.getElementById("way").classList.add("active");
    } else if (page === "results.html") {
        document.getElementById("results").classList.add("active");
    }
    })
    .catch((error) => console.error("Error al cargar el menú lateral:", error));
});
