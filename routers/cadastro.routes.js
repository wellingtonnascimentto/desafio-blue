const express = require("express"); //import do express
const router = express.Router(); //define app como express
const cadastro = require("../model/cadastro"); // import do modelo cidade

router.get('/', (req,res) => {
    res.status(200).json({message:"rota cadastro ok"});
});

router.post('/add', async (req,res) => { //add novo cidade no banco

    //validando as entradas do usuario
    if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;

    }else if(!req.body.nome_usuario){
        res.status(400).json({message: "esta faltando nome_usuario"});
        return;

    }else if(!req.body.senha){
        res.status(400).json({message: "esta faltando senha"});
        return; 
    }

    await cadastro.create(req.body).then(() => {
        res.status(200).json({message: "cadastrado com sucesso"});
    }).catch((err) => {
        res.status(400).json({message: "algo esta errado"});
        console.error(err);
    })
});

router.get('/listall', async (req,res) => {
    await cadastro.find({}).then((cadastrados) => { //pega todo mundo do banco
        console.log(cadastrados);
        res.status(200).json(cadastrados);
    }).catch((err) => {
        res.status(204).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});

router.get('/listallid/:id', async (req,res) => {
    const id = req.params.id;  //recebendo nome por parametro
    await cadastro.findOne({ id:id }).then((cadastro) => { //findOne retorna o primeiro que der match com o item passado
        console.log(cadastro);
        if(cadastro == null){ //validando se retorna null 
            res.status(404).json({message: "nao foi encontrado"});
        }else{
            res.status(200).json(cadastro);
        }
    }).catch((err) => {
        res.status(404).json({message:"Nada foi encontrado"});
        console.error(err);
    });
});


router.put('/update/:id', async (req,res) => {
    const id = req.params.id;
    if(!id){
        res.status(400).json({message: "esta faltando id na URL"});
        return;

    }else if(!req.body.nome){
        res.status(400).json({message: "esta faltando nome"});
        return;

    }else if(!req.body.nome_usuario){
        res.status(400).json({message: "esta faltando nome_usuario"});
        return;

    }else if(!req.body.senha){
        res.status(400).json({message: "esta faltando senha"});
        return; 
    }


    await cadastro.updateOne({ _id:id},req.body).then(() => { //updateOne atualiza o primeiro que encontrar e der match
        res.status(200).json({message: "Atualizado com sucesso"});
    }).catch((err) => {
        console.error(err);
        res.status(400).json({message: "algo esta errado"});
    });
});

router.delete('/delete/:id', async (req,res) => {
    if( req.params.id.length == 24){ //se o id tem pelo menos 24 chars
        await cadastro.deleteOne({_id:req.params.id}).then(() => { //deleta o primeiro que der match
            res.status(200).json({message: "Deletado com sucesso"});
        }).catch((err) => {
            console.error(err);
            res.status(400).json({message: "algo esta errado"});
        });
    }else{
        res.status(400).json({message: "id precisa ter 24 caracteres"});
    }
});

module.exports = router;