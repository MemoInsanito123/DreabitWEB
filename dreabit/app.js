const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const sessionsRoutes = require('./routes/sessions.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una cadena segura para lo de Google
    resave: false,
    saveUninitialized: false
}));

// Rutas de autenticación
app.use('/sessions', sessionsRoutes);

// Servir archivos estáticos html
app.use(express.static('public/html'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
