const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/agregarAdmin', (req, res) => {

    const type = 2;
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    const query = 'INSERT INTO User_Dreabit(id_user_type, email_user, password_user) VALUES(?,?,?)';

    console.log(req.body);


    db.execute(query, [type, email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta SQL:', err);
            return res.status(500).send('Error interno del servidor');
        }
        return res.status(200).send('Usuario Resgitrado con exito');
    });
});

router.put('/actualizarAdmin', (req, res) => {
    const { id, email, password } = req.body;

    if (!id || !email || !password) {
        return res.status(400).send('Faltan campos obligatorios');
    }

    const query = 'UPDATE User_Dreabit SET email_user = ?, password_user = ? WHERE id_user = ?';

    db.execute(query, [email, password, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar administrador:', err);
            return res.status(500).send('Error interno del servidor');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Administrador no encontrado');
        }

        return res.status(200).send('Administrador actualizado con éxito');
    });
});


module.exports = router;