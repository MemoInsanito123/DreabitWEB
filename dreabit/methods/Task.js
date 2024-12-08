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
            const {frequency_days, frequency_months} = req.body;

            //Si el frequency_days se manda vacio y frequency_months tiene informacion 
            if(frequency_days.length === 0 && frequency_months.length > 0){
                const queryFrequencyMonths = 'INSERT INTO Frequency_Months(id_task, frequency_months) VALUES(?,?)';

                db.execute(queryFrequencyMonths, [id_task, frequency_months], (err, results) => {
                    if(err) return db.rollback(() => res.status(500).send('Error al insertar la Frequency_Months Task'));
                    
                    db.commit(err => {
                        if(err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                        
                        return res.status(201).send({mensaje: 'Tarea, Frecuency_Task agregados correctamente'});
                    });
                });
            }
            //Si el frequency_months se manda vacio y frecuency_days tiene informacion
            else if (frequency_months.length === 0 && frequency_days.length > 0){
                const queryFrequencyDays = 'INSERT INTO Frequency_Days (id_task, frequency_days) VALUES(?,?)';

                db.execute(queryFrequencyDays, [id_task, frequency_days], (err, results) => {
                    if(err) return db.rollback(() => res.status(500).send('Error al insertar la Frequency_Days Task'));
                    
                    db.commit(err => {
                        if(err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                        
                        return res.status(201).send({mensaje: 'Tarea, Frecuency_Task agregados correctamente'});
                    });
                });
            }
            //Si ambos se mandan con algo de informacion eso es un error
            else{
                return db.rollback(() => res.status(500).send('Error al insertar la Frequency Task'));
            }
        });
    });
});

//Obtener las tareas apartir del ID de usuario las ordena por prioridad
router.post('/get', (req, res) => {
    const {id_user} = req.body;
    const query = 'SELECT Task.id_task, Task.task, Frequency_Days.frequency_days, Frequency_Months.frequency_months, Priority_Task.priority_type FROM Task LEFT JOIN Frequency_Days ON Frequency_Days.id_task = Task.id_task LEFT JOIN Frequency_Months ON Frequency_Months.id_task = Task.id_task INNER JOIN Priority_Task ON Priority_Task.id_priority = Task.id_priority INNER JOIN Way ON Way.id_way = Task.id_way INNER JOIN User_Dreabit ON User_Dreabit.id_user = Way.id_user WHERE User_Dreabit.id_user = ? ORDER BY CASE WHEN Priority_Task.priority_type = "High" THEN 1 WHEN Priority_Task.priority_type = "Medium" THEN 2 WHEN Priority_Task.priority_type = "Low" THEN 3 ELSE 4 END';

    db.execute(query, [id_user], (err,results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.json(results);
    });

});

//Editar los datos de una tarea

router.put('/put', (req, res) => {

    
    
});

//Eliminar la tarea

module.exports = router;