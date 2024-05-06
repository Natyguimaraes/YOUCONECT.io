const express = require('express');
const app = express();
const port = 5500;
const conn = require('./conecta.js');
app.use(express.static('public'));


app.use(express.urlencoded({extended:true}));

app.get('/cadastro',(req,res) =>{
    res.sendFile(__dirname + '/cadastro.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.html');
});
app.get('/contato',(req,res) => {
res.sendFile(__dirname + '/contato.html');
});
app.get('/projeto', (req, res)=>{
    res.sendFile(__dirname + '/cadastroprojeto.html')
});
app.get('/visualizar', (req, res) => {
    res.sendFile(__dirname + '/visualizar.html')
});

app.get('/visualizarprojeto', (req, res) => {
    res.sendFile(__dirname + '/visualizarprojeto.html')
});

app.post('/submit',async(req,res) =>{
    const nome = req.body.Nome;
    const sobrenome = req.body.Sobrenome;
    const email = req.body.Email;
    const telefone = req.body.Telefone;
    const data = req.body.data;
    const genero = req.body.genero;
    const curso = req.body.curso;
    const senha = req.body.Senha;

    //console.log("Nome: ", nome);

    const sql = 'INSERT INTO usuario  (nome, sobrenome, email, telefone, dataNascimento, genero, curso, senha) VALUES (?,?,?,?,?,?,?,?)';
    conn.query(sql, [nome, sobrenome, email,telefone,data ,genero,curso,senha], (error, results, fields)=>{
        if(error){
console.error('Erro ao inserir os dados: ' +error.stack);
res.status(500).send('Erro ao inserir os dados no banco de dados.');
return;
        }
        console.log('Dados Inseridos com sucesso. ID:', results.insertId);
        res.status(200).send('Dados Inseridos com sucesso no banco de dados.');
    });
});

app.get('/dados',(req,res)=>{
    const consult = 'SELECT * FROM usuario';
    conn.query(consult, (error,results,fields)=>{
        if(error){
            console.error("Erro ao rodar a consult" +error.stack);
            return;
        }
        res.json(results);
        //console.log(results);
    });
});

app.post('/envio',async(req,res) =>{
    const nome = req.body.nome;
    const curso = req.body.curso;
    const data = req.body.data;
    const participante = req.body.participante;
    const arquivo = req.body.arquivo;
    const descricao = req.body.descricao;

    const sql = 'INSERT INTO projeto  (nome, curso, data, participante, arquivo, descricao) VALUES (?,?,?,?,?,?)';
    conn.query(sql, [nome, curso, data, participante, arquivo, descricao], (error, results, fields)=>{
        if(error){
console.error('Erro ao inserir os dados: ' +error.stack);
res.status(500).send('Erro ao inserir os dados no banco de dados.');
return;
        }
        console.log('Dados Inseridos com sucesso. ID:', results.insertId);
        res.status(200).send('Dados Inseridos com sucesso no banco de dados.');
    });
});

app.get('/dadosproj',(req,res)=>{
    const consult = 'SELECT * FROM projeto';
    conn.query(consult, (error,results,fields)=>{
        if(error){
            console.error("Erro ao rodar a consult" +error.stack);
            return;
        }
        res.json(results);
        //console.log(results);
    });
});

app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});