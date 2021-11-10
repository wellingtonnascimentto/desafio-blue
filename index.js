require('dotenv').config()
const express = require("express");  //chamando o express
const app = express();  //definindo o app como express

app.use(express.json());  //definindo o JSON no projeto

const Conn = require("./model/conn/index"); //importando a conexao

Conn(); //executa a func de conexao

const cadastroRouter = require("./routers/cadastro.routes");
app.use('/cadastro',cadastroRouter);
console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});