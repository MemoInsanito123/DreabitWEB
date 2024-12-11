const express = require('express');
const router = express.Router();
const db = require('../db/db');

//Registrar una Tarea a la base de datos
router.post("/post", (req, res) => {
    db.beginTransaction(err => {
        if(err) return db.rollback(() => res.status(500).send('Error al iniciar la transaccion'));

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
router.post('/getIDUser', (req, res) => {
    const {id_user} = req.body;
    const query = 'SELECT Task.id_task, Task.task, Frequency_Task.frequency , Priority_Task.priority_type FROM Task INNER JOIN Frequency_Task ON Frequency_Task.id_task = Task.id_task INNER JOIN Priority_Task ON Priority_Task.id_priority = Task.id_priority INNER JOIN Way ON Way.id_way = Task.id_way INNER JOIN User_Dreabit ON User_Dreabit.id_user = Way.id_user WHERE User_Dreabit.id_user = ? ORDER BY CASE WHEN Priority_Task.priority_type = "High" THEN 1 WHEN Priority_Task.priority_type = "Medium" THEN 2 WHEN Priority_Task.priority_type = "Low" THEN 3 ELSE 4 END';

    db.execute(query, [id_user], (err,results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.json(results);
    });
});

//Obtener las tareas mediante el ID del camino las ordena por prioridad 
router.post('/getIDWay', (req, res) => {
    const {id_way_db} = req.body;
    const query = 'SELECT Way.id_way, Task.id_task, Task.task, Frequency_Task.frequency, Priority_Task.priority_type FROM Task INNER JOIN Frequency_Task ON Frequency_Task.id_task = Task.id_task INNER JOIN Priority_Task ON Priority_Task.id_priority = Task.id_priority INNER JOIN Way ON Way.id_way = Task.id_way WHERE Way.id_way = ? ORDER BY CASE WHEN Priority_Task.priority_type = "High" THEN 1 WHEN Priority_Task.priority_type = "Medium" THEN 2 WHEN Priority_Task.priority_type = "Low" THEN 3 ELSE 4 END;'
    
    db.execute(query, [id_way_db], (err,results) => {
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
    //Comenzar una transaccion para evitar registar cosas a lo wey si algo falla
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

//Crear una subtarea
router.post('/post/subtask', (req, res) => {
    
    const {id_task_db, name_sub_task, description_sub_task} = req.body;
    const query = 'INSERT INTO Sub_Task(id_task, name_sub_task, description_sub_task) VALUES(?,?,?)';

    db.execute(query, [id_task_db, name_sub_task, description_sub_task], (err, results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.status(201).status('Sub_Task registrada con exito');
    });
});

//Obtener las subtareas mediante el ID de la tarea
router.post('/get/subtask', (req, res) => {
    const {id_task_db} = req.body;
    const query = 'SELECT * FROM Sub_Task WHERE id_task = ?'

    db.execute(query, [id_task_db], (err, results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.status(200).json(results);
    });
});

//Modificar una subtarea
router.put('/put/subtask', (req, res) => {
    const {id_sub_task_db, name_sub_task_edit, description_sub_task_edit} = req.body;
    const query = 'UPDATE Sub_Task SET name_sub_task = ?, description_sub_task = ? WHERE id_sub_task = ?';    

    db.execute(query, [name_sub_task_edit, description_sub_task_edit, id_sub_task_db], (err, results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.status(200).send('Sub_Task actualizada con exito');
    });
});

//Eliminar una subtarea
router.delete('/delete/subtask', (req, res) => {
    const {id_sub_task_db} = req.body;
    const query = 'DELETE FROM Sub_Task WHERE id_sub_task = ?';

    db.execute(query, [id_sub_task_db], (err, results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.status(200).send('Sub_Task eliminada con exito');
    });
});

module.exports = router;