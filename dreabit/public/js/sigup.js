// Rellenar el select de años y días dinámicamente
window.addEventListener('DOMContentLoaded', () => {
    ///          TODO ESTO ES LO DE LA FECHA DE NACIMIENTO           ///
    const anioSelect = document.getElementById('anio');
    const mesSelect = document.getElementById('mes');
    const diaSelect = document.getElementById('dia');
    const forms = document.querySelectorAll('form');
    const buttons = document.querySelectorAll('.siguiente');

    // Función para verificar si un año es bisiesto
    const esBisiesto = (anio) => {
        return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
    };

    // Los días del mes
    const diasPorMes = {
        1: 31, // Enero
        2: 28, // Febrero
        3: 31, // Marzo
        4: 30, // Abril
        5: 31, // Mayo
        6: 30, // Junio
        7: 31, // Julio
        8: 31, // Agosto
        9: 30, // Septiembre
        10: 31, // Octubre
        11: 30, // Noviembre
        12: 31, // Diciembre
    };

    // Nombres de los meses
    const nombresDeMeses = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    // Generar los meses con nombre
    for (let i = 0; i < nombresDeMeses.length; i++) {
        const option = document.createElement('option');
        option.value = i + 1;
        option.textContent = nombresDeMeses[i];
        mesSelect.appendChild(option);
    }
    
    // Generar años desde 1900 hasta el año actual
    const anioActual = new Date().getFullYear();
    for (let i = anioActual; i >= 1900; i--) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        anioSelect.appendChild(option);
    }

    // Generar los días del mes seleccionado
    const generarDias = () => {
        const anioSeleccionado = parseInt(anioSelect.value, 10);
        const mesSeleccionado = parseInt(mesSelect.value, 10);

        // Validar que ambos valores existan
        if (isNaN(anioSeleccionado) || isNaN(mesSeleccionado)) {
            diaSelect.innerHTML = '<option value="" disabled selected>Día</option>';
            return;
        }

        let diasMaximos = diasPorMes[mesSeleccionado];

        // Ajustar lo de los años bisiestos
        if (mesSeleccionado === 2 && esBisiesto(anioSeleccionado)) {
            diasMaximos = 29;
        }

        diaSelect.innerHTML = '<option value="" disabled selected>Día</option>';

        // Generar las opciones de días
        for (let i = 1; i <= diasMaximos; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i < 10 ? '0' + i : i;
            diaSelect.appendChild(option);
        }
    };

    anioSelect.addEventListener('change', generarDias);
    mesSelect.addEventListener('change', generarDias);
    generarDias();

    forms[0].classList.add('active');

    ///     TODO ESTO SON LAS VALIDACIONES (excepto lo de hasta abajo, eso es lo de cambio de form xd)      ///
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const currentForm = button.closest('form');     // Formulario actual
            const nextFormClass = button.dataset.next;      // Clase del siguiente formulario         

            // Primer form
            if (currentForm.id === 'form1') {
                var name = document.getElementById('name').value;
                var paterno = document.getElementById('paterno').value;
                var materno = document.getElementById('materno').value;
                var username = document.getElementById('username').value;

                const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+$/;
                const userRegex = /^[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ0-9 ]+$/;
                const userRegex2 = /[a-zA-ZÁÉÍÓÚáéíóúÜüÑñ]/;

                // Campos vacíos
                if (username === '' || name === '' || paterno === '' || materno === '') {
                    alert('Por favor completa todos los campos');
                    return;
                }

                // Nombre
                if (!nameRegex.test(name)) {
                    alert('Por favor ingresa un nombre válido')
                    return;
                }

                if (name.length > 100) {
                    alert('El nombre debe tener menos de 100 caracteres');
                    return;
                }

                // Apellidos
                if (!nameRegex.test(paterno) || !nameRegex.test(materno)) {
                    alert('Por favor ingresa un apellido válido')
                    return;
                }

                if (paterno.length > 100 || materno.length > 100) {
                    alert('Los apellidos deben tener menos de 100 caracteres')
                    return;
                }

                // Apodo
                if (username.length < 5 || username.length > 25) {
                    alert('El apodo debe tener entre 5 y 25 caracteres')
                    return;
                }

                if (!userRegex.test(username)) {
                    alert('Por favor ingresa un apodo válido')
                    return;
                }

                if (!userRegex2.test(username)) {
                    alert('El apodo debe de tener al menos un carácter alfabético')
                    return;
                }
            }  
            
            // Segundo form
            if (currentForm.id === 'form2') {
                var email = document.getElementById('email').value;

                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;

                // Correo
                if (email === '') {
                    alert('Por favor completa todos los campos.')
                    return;
                }

                if (!emailRegex.test(email)) {
                    alert('Por favor, ingresa un correo válido')
                    return;
                }

                const anioSeleccionado = anioSelect.value;
                const mesSeleccionado = mesSelect.value;
                const diaSeleccionado = diaSelect.value;

                // Fecha de Nacimiento
                if (!anioSeleccionado || !mesSeleccionado || !diaSeleccionado) {
                    alert('Por favor selecciona un año, mes y día.');
                    return;
                }
            }

            // Tercer form
            if (currentForm.id === 'form3') {
                var password = document.getElementById('password').value;
                var confirm_p = document.getElementById('confirm_p').value;

                if (password === '' || confirm_p === '') {
                    alert('Por favor completa todos los campos')
                    return;
                }

                if (password.length > 100) {
                    alert('La contraseña debe tener menos de 100 caracteres')
                    return;
                }

                if (password.length < 8) {
                    alert('La contraseña debe tener más de 8 caracteres')
                    return;
                }

                if (password !== confirm_p) {
                    alert('Las contraseñas deben coincidir')
                    return;
                }

                // Mensaje temporal para confirmar que si termino
                alert('Registro completado exitosamente.');
                return;
            }
               
            currentForm.classList.remove('active');                                 // Ocultar el formulario actual
            document.querySelector(`.${nextFormClass}`).classList.add('active');    // Mostrar el siguiente                    
        });
    });
});