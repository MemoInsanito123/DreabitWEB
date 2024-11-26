const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./db.js');
const authRoutes = require('./auth.js');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de sesiones
app.use(session({
    secret: 'mi_secreto', // Cambia esto por una cadena segura
    resave: false,
    saveUninitialized: false
}));

// Rutas de autenticación
app.use('/auth', authRoutes);

// Servir archivos estáticos
app.use(express.static('public'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
