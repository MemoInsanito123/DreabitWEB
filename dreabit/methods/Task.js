const express = require('express');
const router = express.Router();
const db = require('../db/db');

//Registrar una Tarea a la base de datos
router.post("/post", (req, res) => {
    db.beginTransaction(err => {
        if(err) return res.status(500).send('Error al iniciar la transaccion');

        const {id_way_db, priority, task} = req.body;
        const queryTask = 'INSERT INTO Task(id_way, id_priority, task) VALUES (?,?,?)';

        db.execute(queryTask, [id_way_db, priority, JSON.stringify(task)], (err, results) => {
            if(err) return db.rollback(() => res.status(500).send('Error al insertar Task'));

            let id_task = results.insertId;
            const {frequency} = req.body;

            const queryFrequency = 'INSERT INTO Frequency_Task(id_task, frequency) VALUES(?,?)';

            db.execute(queryFrequency, [id_task, frequency], (err, results) => {
                if(err) return db.rollback(() => res.status(500).send('Error al insertar la Frequency Task'));
                
                db.commit(err => {
                    if(err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                    
                    return res.status(201).send({mensaje: 'Tarea, Frecuency_Task agregados correctamente'});
                });
            });            
        });
    });
});

//Obtener las tareas apartir del ID de usuario las ordena por prioridad
router.post('/get', (req, res) => {
    const {id_user} = req.body;
    const query = 'SELECT Task.id_task, Task.task, Frequency_Task.frequency , Priority_Task.priority_type FROM Task INNER JOIN Frequency_Task ON Frequency_Task.id_task = Task.id_task INNER JOIN Priority_Task ON Priority_Task.id_priority = Task.id_priority INNER JOIN Way ON Way.id_way = Task.id_way INNER JOIN User_Dreabit ON User_Dreabit.id_user = Way.id_user WHERE User_Dreabit.id_user = ? ORDER BY CASE WHEN Priority_Task.priority_type = "High" THEN 1 WHEN Priority_Task.priority_type = "Medium" THEN 2 WHEN Priority_Task.priority_type = "Low" THEN 3 ELSE 4 END';

    db.execute(query, [id_user], (err,results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.json(results);
    });

});

//Editar los datos de una tarea
router.put('/put', (req, res) => {
    db.beginTransaction(err => {
        if(err) return db.rollback(() => res.status(500).send('Error al iniciar la transaccion'));

        const {id_task_db, priority, task, frequency} = req.body;

        const queryTask = 'UPDATE Task SET id_priority = ?, task = ? WHERE id_task = ?';

        db.execute(queryTask, [priority, task, id_task_db], (err, results) => {
            if(err) return db.rollback(() => res.status(500).send('Error en la consulta Task'));


            const queryFrequency = 'UPDATE Frequency_Task SET frequency = ? WHERE id_task = ?';
            db.execute(queryFrequency, [frequency, id_task_db], (err , results) => {
                if(err) return db.rollback(() => res.status(500).send('Error en la consulta Frequency'));
                
                db.commit(err => {
                    if(err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                    
                    return res.status(201).send({mensaje: 'Tarea, Frecuency_Task actualizados correctamente'});
                });
            });
        });
    }); 
});

//Eliminar el registro de una tarea
router.delete('/delete', (req, res) => {
    db.beginTransaction(err => {
        if(err) return db.rollback(() => res.status(500).send('Error al iniciar la transaccion'));

        const {id_task_db} = req.body;
        const queryFrequency = 'DELETE FROM Frequency_Task WHERE id_task = ?';

        db.execute(queryFrequency, [id_task_db], (err, results) => {
            if(err) return db.rollback(() => res.status(500).send('Error al eliminar Frequency'));

            const queryTask = 'DELETE FROM Task WHERE id_task = ?';
            db.execute(queryTask, [id_task_db], (err, results) => { 
                if(err) return db.rollback(() => res.status(500).send('Error al eliminar Task'));

                db.commit(err => {
                    if(err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                    
                    return res.status(201).send({mensaje: 'Tarea, Frecuency_Task eliminados correctamente'});
                })
            });
        });
    });
})

//Eliminar la tarea

module.exports = router;