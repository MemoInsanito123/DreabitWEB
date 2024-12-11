const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db.js');

const sessionsRoutes = require('./methods/User_Dreabit.js');
const waysRoutes = require('./methods/Way.js');
const tasksRoutes = require('./methods/Task.js');

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

// Rutas de autenticación
app.use('/sessions', sessionsRoutes);
app.use('/ways', waysRoutes);
app.use('/tasks', tasksRoutes);

// Servir archivos estáticos html
app.use(express.static('public'));
app.use(express.static('public/html'));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
