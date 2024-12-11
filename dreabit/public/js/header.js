document.addEventListener("DOMContentLoaded", function () {
fetch("header.html")
    .then(response => response.text())
    .then(data => {
    // Insertar el menú en el contenedor
    document.getElementById("menu-container").innerHTML = data;

    // Cambiar el texto dinámicamente según la página actual
    const menuText = document.querySelector("#menu-text");
    const pageName = window.location.pathname.split("/").pop();

    // Definir textos para cada página
    const pageTitles = {
        "client.html": "¡Bienvenido! Hoy es otro paso hacia tus metas.",
        "way.html": "Establece el ritmo de tus días y logra tus metas.",
        "Estadisticas.html": "Cada paso cuenta. Descubre cómo tu rutina está transformando tu vida.",
        "Comunidad.html": "Aquí las conversaciones son tan valiosas como tus metas. ¡Inicia una charla!",
    };

    // Cambiar el texto según la página
    if (menuText) {
        menuText.textContent = pageTitles[pageName] || "Página Desconocida";
    }
    })
    .catch(error => console.error("Error al cargar el menú:", error));
});
