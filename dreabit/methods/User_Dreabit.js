const express = require('express');
const router = express.Router();
const db = require('../db/db');


//Verificar si hay un usuario con las credenciales que se le mandan en la request, si existe uno retornar su tipo de usuario
router.post('/login', (req, res) => {
    //Desestrutura el JSON que se manda el la Request(Solicitud)
    const {email, password} = req.body;
    const userQuery = 'SELECT * FROM User_Dreabit WHERE email_user = ? AND password_user = ?';

    //Ejecutamos el query en la base de datos con los datos que mandamos en el Request
    db.execute(userQuery, [email, password], (err, results) => {
        
        //Hay un error en la consulta
        if(err){
            return res.status(500).json({status:false, message: `Error ${500}`});
        }

        //La base de datos encontro un registro
        if(results.length > 0){
            //Guardamos ese registro completo
            const user = results[0];
            //Retornamos un Json indicando el tipo de usuario y si el status fue true
            return res.json({
                status : true,
                role : user.id_user_type
            })
        }
        return res.status(401).json({status: false, message: `Error ${401}` });
    });
});

//Registrar un nuevo usruario en la Base de Datos ///PENDIENTE CON JUAREZ
router.post('/signup', (req, res) => {
    db.beginTransaction(err => {
        if(err) return res.status(500).send('Error al iniciar la transaccion');

        const {type, email, password} = req.body;
        const query = 'INSERT INTO User_Dreabit(id_user_type, email_user, password_user) VALUES(?,?,?)';
    
        db.execute(query, [type, email, password], (err, results) => {
            if(err) return db.rollback(() => res.status(500).send('Error en la consulta User_Dreabit'));  

            let id_user = results.insertId;
            const {name_user, paternal_surname, maternal_surname} = req.body;
            const queryName = 'INSERT INTO User_Name(id_user, name_user, paternal_surname, maternal_surname) VALUES(?,?,?,?)';

            db.execute(queryName, [id_user, name_user, paternal_surname, maternal_surname], (err, results) => {
                if(err) return db.rollback(() => res.status(500).send('Error en la consulta User_Name'));

                const queryBirthdate = 'INSERT INTO User_Birthdate(id_user, birthdate) VALUES(?,?)';
                const {birthdate} = req.body;

                db.execute(queryBirthdate, [id_user, birthdate], (err, results) => {
                    if(err) return db.rollback(() => res.status(500).send('Error en la consulta User_Birthdate'));

                    const queryProfile = 'INSERT INTO User_Profile(id_user, username) VALUES(?,?)';
                    const {username} = req.body;

                    db.execute(queryProfile, [id_user, username], (err, results) => {
                        if(err) return db.rollback(() => res.status(500).send('Error en la consulta User_Profile'));

                        db.commit(err => {
                            if(err) return db.rollback(() => res.status(500).send('Error al confirmar transacción'));
                            
                            return res.status(201).send({mensaje: 'User_Name, User_Birthdate, User_Profile agregados correctamente'});
                        });
                    });
                });
            });
        });
    })
});

//Metodo para obtener el id del usuario mediante el correo electronico
router.post('/getID', (req, res) => {

    const {email} = req.body;
    const query = 'SELECT User_Dreabit.id_user FROM User_Dreabit WHERE email_user = ?';
    
    db.execute(query, [email], (err, results) => {
        if(err) return res.status(500).send('Error en la consulta');

        return res.json(results);
    })
});

module.exports = router;