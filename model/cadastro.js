const mongoose = require("mongoose");  //importando o mongoose

const cadastroModel = new mongoose.Schema({ //criando nosso modelo do banco
    nome: { type: String, required: true }, // chave/ valor: tipo do valor e se é obrigatorio
    nome_usuario: { type: String, required: true },
    senha: { type: Number, required: true }, 
    dataCriacao: { type: Date, default: Date.now } //default, valor padrao caso nao seja passado
});

const cadastro = mongoose.model("cadastro",cadastroModel); // a criacao do modelo na colection Pessoas

module.exports = cadastro; //exportando o modelo pronto