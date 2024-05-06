const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database: 'youconect'
});

connection.connect((err) => {
    if(err){
        console.error('Erro ao conectar: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = connection;