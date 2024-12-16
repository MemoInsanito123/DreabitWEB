const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/get' , (req, res) => {

    const {email} = req.body;

    const query = 'SELECT Way.id_way, Way.name_way, Way.description_way FROM Way INNER JOIN User_Dreabit ON User_Dreabit.email_user = ? AND User_Dreabit.id_user = Way.id_user';

    db.execute(query, [email], (err, results) => {
        if(err) return res.status(500).send('Error de consulta');

        return res.json(results);
    });

});

router.post('/post', (req, res) => {

    const {id_user, name_cycle, description_cycle} = req.body;
    const query = 'INSERT INTO Way(id_user, name_way, description_way) VALUES(?,?,?)';

    
    db.execute(query, [id_user, name_cycle, description_cycle], (err, results) => {
        if(err) return res.status(500).send('Error de consulta');

        return res.status(201).send({menssage : 'Camino registrado con exito'});
    });
});

router.put('/put', (req, res) => {

    const {id_way_db, name_way, description_way} = req.body;
    const query = 'UPDATE Way SET name_way = ?, description_way = ? WHERE id_way = ?';

    db.execute(query, [name_way, description_way, id_way_db], (err, results) => {
        if(err) return res.status(500).send('Error en la peticion');

        return res.status(201).send('Camino Modificado');
    });
});

router.delete('/delete', (req, res) => {
    const {id_way_db} = req.body;
    const query = 'DELETE FROM Way WHERE id_way = ?'

    db.execute(query, [id_way_db], (err, results) => {
        if(err) return res.status(500).send('Error con la consulta');

        return res.status(201).send('Camino Eliminado con exito');
    });
});


module.exports = router;