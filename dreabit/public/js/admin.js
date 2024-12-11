document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("client-form");
    const clientDataDiv = document.getElementById("client-data");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const clientId = document.getElementById("client-id").value;

        try {
            const response = await fetch(`/api/clients/${clientId}`);
            if (response.ok) {
                const client = await response.json();
                displayClientData(client); // Renderiza los datos dinámicamente
            } else {
                alert("Client not found!");
                clientDataDiv.innerHTML = ""; // Limpia los datos si no se encuentra el cliente
                clientDataDiv.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching client data:", error);
        }
    });

    // Renderiza los datos del cliente y permite editar/borrar
    function displayClientData(client) {
        clientDataDiv.style.display = "block";
        clientDataDiv.innerHTML = `
            <h2>Client Data</h2>
            <form id="client-update-form">
                <label for="client-email">Email:</label>
                <input type="email" id="client-email" name="client-email" value="${client.email_user}" required>

                <label for="client-password">Password:</label>
                <input type="password" id="client-password" name="client-password" value="${client.password_user}" required>

                <label for="client-name">Name:</label>
                <input type="text" id="client-name" name="client-name" value="${client.name_user}" required>

                <label for="client-paternal-surname">Paternal Surname:</label>
                <input type="text" id="client-paternal-surname" name="client-paternal-surname" value="${client.paternal_surname || ''}">

                <label for="client-maternal-surname">Maternal Surname:</label>
                <input type="text" id="client-maternal-surname" name="client-maternal-surname" value="${client.maternal_surname || ''}">

                <label for="client-handle">Handle:</label>
                <input type="text" id="client-handle" name="client-handle" value="${client.handle}" required>

                <label for="client-birthdate">Birthdate:</label>
                <input type="date" id="client-birthdate" name="client-birthdate" value="${client.birthdate}" required>

                <button type="submit">Update Client</button>
            </form>
            <button id="delete-client">Delete Client</button>
        `;

        // Funcionalidad de actualización
        const updateForm = document.getElementById("client-update-form");
        updateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const updatedClient = {
                email_user: document.getElementById("client-email").value.trim(),
                password_user: document.getElementById("client-password").value.trim(),
                name_user: document.getElementById("client-name").value.trim(),
                paternal_surname: document.getElementById("client-paternal-surname").value.trim(),
                maternal_surname: document.getElementById("client-maternal-surname").value.trim(),
                handle: document.getElementById("client-handle").value.trim(),
                birthdate: document.getElementById("client-birthdate").value,
            };

            if (validateInputs(updatedClient)) {
                updateClient(client.id_user, updatedClient);
            } else {
                alert("Invalid input. Please check the data and try again.");
            }
        });

        // Funcionalidad de eliminación
        const deleteButton = document.getElementById("delete-client");
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this client?")) {
                deleteClient(client.id_user);
            }
        });
    }

    // Validación de campos
    function validateInputs(client) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar formato de email
        return (
            client.email_user.length > 0 &&
            emailRegex.test(client.email_user) &&
            client.password_user.length >= 4 && // Contraseña de al menos 4 caracteres
            client.name_user.length > 0 &&
            client.handle.length > 0
        );
    }

    // Actualización de datos del cliente
    async function updateClient(clientId, updatedClient) {
        try {
            const response = await fetch(`/api/clients/${clientId}`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedClient),
            });

            if (response.ok) {
                alert("Client updated successfully!");
            } else {
                alert("Failed to update client.");
            }
        } catch (error) {
            console.error("Error updating client:", error);
        }
    }

    // Eliminación de cliente
    async function deleteClient(clientId) {
        try {
            const response = await fetch(`/api/clients/${clientId}`, { method: "DELETE" });

            if (response.ok) {
                alert("Client deleted successfully!");
                clientDataDiv.innerHTML = ""; // Limpia la vista después de eliminar
                clientDataDiv.style.display = "none";
            } else {
                alert("Failed to delete client.");
            }
        } catch (error) {
            console.error("Error deleting client:", error);
        }
    }
});
