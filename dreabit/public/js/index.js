//Juarez Code

// Rellenar el select de años y días dinámicamente
window.addEventListener('DOMContentLoaded', () => {
    const anioSelect = document.getElementById('anio');
    const diaSelect = document.getElementById('dia');
    const forms = document.querySelectorAll('form');
    const buttons = document.querySelectorAll('.siguiente');
    const backButtons = document.querySelectorAll('.btn_atras');

    // Generar años desde 1900 hasta el año actual
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        anioSelect.appendChild(option);
    }

    // Generar días del 1 al 31
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        diaSelect.appendChild(option);
    }

    forms[0].classList.add('active');

    //"Siguiente"
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const currentForm = button.closest('form'); // Formulario actual
            const nextFormClass = button.dataset.next; // Clase del siguiente formulario

            currentForm.classList.remove('active'); // Ocultar el actual
            document.querySelector(`.${nextFormClass}`).classList.add('active'); // Mostrar el siguiente
        });
    });
});




//Funcion para verificar si hay una sesion activa
const verifySession = () => {
    if(localStorage.getItem('user')){
        window.location.href = '/client.html'
    }
};

verifySession();
