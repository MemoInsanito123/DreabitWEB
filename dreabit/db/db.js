const mysql = require('mysql2');

const nameDB = "dreabitdb";

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Y00ng!',
    database: nameDB
});

db.connect((err) => {
    if(err){
        console.error('Error al intentar conectarse a la DB: ' + nameDB + err.stack);
        return;
    }
    else{
        console.log('Conexion exitosa con la DB: ' + nameDB);
    }

});

module.exports = db;