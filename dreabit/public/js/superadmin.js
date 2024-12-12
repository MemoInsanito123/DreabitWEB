document.getElementById('agregarAdmin').addEventListener('submit', async (event) => {
    // Evitar el envío regular del formulario
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }

    
    const JSON_LOGIN = { email, password };

    try {
        const response = await fetch('/superadmin/agregarAdmin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(JSON_LOGIN)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del servidor:', errorText);
            alert(`Error al registrar el administrador: ${errorText}`);
            return;
        }

        const message = await response.text();
        alert(message);
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        alert('Ocurrió un problema al registrar el administrador. Intenta de nuevo más tarde.');
    }
});


document.getElementById('actualizarAdmin').addEventListener('submit', async (event) => {
    // Evitar el envío regular del formulario
    event.preventDefault();

    const id = document.getElementById('id').value.trim();
    const email = document.getElementById('email_upd').value.trim();
    const password = document.getElementById('password_upd').value.trim();

    if (!id || !email || !password) {
        alert('Por favor, completa todos los campos antes de continuar.');
        return;
    }

    const JSON_UPDATE = { id, email, password };

    try {
        const response = await fetch('/superadmin/actualizarAdmin', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(JSON_UPDATE)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error del servidor:', errorText);
            alert(`Error al actualizar el administrador: ${errorText}`);
            return;
        }

        const message = await response.text();
        alert(message);
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        alert('Ocurrió un problema al actualizar el administrador. Intenta de nuevo más tarde.');
    }
});
