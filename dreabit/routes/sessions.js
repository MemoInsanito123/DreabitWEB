const express = require('express');
const router = express.Router();
const db = require('../db/db');


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

router.post('/signup', (req, res) => {

    const {type, email, password} = req.body;
    const query = 'INSERT INTO User_Dreabit(id_user_type, email_user, password_user) VALUES(?,?,?)';

    db.execute(query, [type, email, password], (err, results) => {
        if(err){
            return res.status(500).send('Server Error: 500');
        }
        return res.status(200).send('Usuario Resgitrado con exito');
    });
});

module.exports = router;