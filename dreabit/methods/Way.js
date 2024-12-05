const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post('/get' , (req, res) => {

    const {email} = req.body;

    const query = 'SELECT Way.id_way, Way.name_way, Way.description_way FROM Way JOIN User_Dreabit WHERE User_Dreabit.email_user = ?';

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

        return res.status(200).send({menssage : 'Camino registrado con exito'});

    });

});

router.get('/getID', (req, res) => {
    
});

module.exports = router;