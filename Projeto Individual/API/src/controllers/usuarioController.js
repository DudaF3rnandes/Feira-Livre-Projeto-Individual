var usuarioModel = require("../models/usuarioModel");
var quizRespostaModel = require("../models/quizRespostaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    }
    if (!senha) {
        return res.status(400).send("Sua senha está indefinida!");
    }

    usuarioModel.autenticar(email, senha)
        .then((resultadoAutenticar) => {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

            if (resultadoAutenticar.length === 1) {
                res.json({
                    idUsuario: resultadoAutenticar[0].idUsuario,
                    email: resultadoAutenticar[0].email,
                    nome: resultadoAutenticar[0].nome
                });
            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
            }
        })
        .catch((erro) => {
            console.error("\nHouve um erro ao realizar o login!", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function registrar(req, res) {
    console.log("BODY RECEBIDO:", req.body);
    var {
        idUsuario,
        idQuiz, // <-- ADICIONADO AQUI
        corretas,
        erradas,
        barraca,
        perdida,
        saldo,
        tempo
    } = req.body;

    if (!idUsuario) return res.status(400).send("ID do usuário está undefined!");
    if (!idQuiz) return res.status(400).send("ID do quiz está undefined!"); // <-- Verificação extra

    quizRespostaModel.registrar(
        idUsuario,
        idQuiz,
        corretas,
        erradas,
        barraca,
        perdida,
        saldo,
        tempo
    ).then(resultado => {
        res.status(200).json(resultado);
    }).catch(erro => {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    autenticar,
    cadastrar,
    registrar
}