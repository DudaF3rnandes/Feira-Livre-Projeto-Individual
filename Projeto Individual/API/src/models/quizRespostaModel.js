var database = require("../database/config");

function registrar(idUsuario, idQuiz, corretas, erradas, barraca, perdida, saldo, tempo) {
    var instrucaoSql = `
        INSERT INTO quizResposta 
        (fkUsuario, fkQuiz, RespostaCerta, RespostaErrada, BarracaEscolhida, FeiraCoinPerdida, SaldoFinalFeiraCoin, TempoResposta)
        VALUES (${idUsuario}, ${idQuiz}, ${corretas}, ${erradas}, '${barraca}', ${perdida}, ${saldo}, ${tempo});
    `;
    console.log("Executando SQL:", instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrar
};