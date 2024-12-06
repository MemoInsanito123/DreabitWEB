const express = require('express');
const router = express.Router();
const db = require('../db/db');

router.post("/post", (req, res) => {

    db.beginTransaction(err => {
        if(err) return res.status(500).send('Error al iniciar la transaccion');

        const {id_way_db, priority, task} = req.body;
        const queryTask = 'INSERT INTO Task(id_way, id_priority, task) VALUES (?,?,?)';

        db.execute(queryTask, [id_way_db, priority, task], (err, results) => {
            if(err) return db.rollback(() => res.status(500).send('Error al insertar Task'));

            let id_task = results.insertId;
            const {frequency_days, frequency_months} = req.body;

            //Si el frequency_days se manda vacio
            if(frequency_days === ''){
                
            }
            else if (frequency_months === ''){

            }
            else{
                return db.rollback(() => res.status(500).send('Error al insertar la Frequency Task'));
            }

            const queryFrequency = 'INSERT INTO '

            db.execute()

        });
    });

});

module.exports = router;