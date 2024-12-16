const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db.js');

const sessionsRoutes = require('./methods/User_Dreabit.js');
const waysRoutes = require('./methods/Way.js');
const tasksRoutes = require('./methods/Task.js');
const superadminRoutes = require('./methods/SuperAdmin.js');

const path = require('path');


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Ruta por default para el Local Host
app.get('/', (req,res) => {
    return res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});
app.get("/api/clients/:id", (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT 
            User_Dreabit.email_user, User_Dreabit.password_user, 
            User_Name.name_user, User_Name.paternal_surname, User_Name.maternal_surname, User_Name.handle,
            User_Birthdate.birthdate
        FROM User_Dreabit
        LEFT JOIN User_Name ON User_Dreabit.id_user = User_Name.id_user
        LEFT JOIN User_Birthdate ON User_Dreabit.id_user = User_Birthdate.id_user
        WHERE User_Dreabit.id_user = ?;
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Client not found" });
        } else {
            res.json(results[0]);
        }
    });
});

app.put("/api/clients/:id", (req, res) => {
    const { id } = req.params;
    const {
        email_user, password_user, name_user,
        paternal_surname, maternal_surname, handle, birthdate
    } = req.body;

    const updateUserQuery = `
        UPDATE User_Dreabit 
        SET email_user = ?, password_user = ? 
        WHERE id_user = ?;
    `;
    const updateNameQuery = `
        UPDATE User_Name 
        SET name_user = ?, paternal_surname = ?, maternal_surname = ?, handle = ? 
        WHERE id_user = ?;
    `;
    const updateBirthdateQuery = `
        UPDATE User_Birthdate 
        SET birthdate = ? 
        WHERE id_user = ?;
    `;

    db.query(updateUserQuery, [email_user, password_user, id], (err) => {
        if (err) {
            console.error("Error updating User_Dreabit:", err);
            return res.status(500).json({ error: "Error updating User_Dreabit" });
        }

        db.query(updateNameQuery, [name_user, paternal_surname, maternal_surname, handle, id], (err) => {
            if (err) {
                console.error("Error updating User_Name:", err);
                return res.status(500).json({ error: "Error updating User_Name" });
            }

            db.query(updateBirthdateQuery, [birthdate, id], (err) => {
                if (err) {
                    console.error("Error updating User_Birthdate:", err);
                    return res.status(500).json({ error: "Error updating User_Birthdate" });
                }

                res.status(200).json({ message: "Client updated successfully" });
            });
        });
    });
});


// Rutas de autenticación
app.use('/sessions', sessionsRoutes);
app.use('/ways', waysRoutes);
app.use('/tasks', tasksRoutes);
app.use('/superadmin', superadminRoutes);

// Servir archivos estáticos html
app.use(express.static('public'));
app.use(express.static('public/html'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
