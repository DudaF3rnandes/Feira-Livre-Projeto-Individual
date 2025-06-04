var quizRespostaModel = require("../models/quizRespostaModel");

function registrar(req, res) {
    console.log("BODY RECEBIDO:", req.body);
  var {
  idUsuario,
  idQuiz,
  corretas,
  erradas,
  barraca,
  perdida,
  saldo,
  tempo
} = req.body;


    if (!idUsuario) return res.status(400).send("ID do usuário está undefined!");

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
    registrar
};
