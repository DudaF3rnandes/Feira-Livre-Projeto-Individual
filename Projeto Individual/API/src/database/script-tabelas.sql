-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE feira;

USE feira;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) NOT NULL UNIQUE,
senha VARCHAR(45) NOT NULL
);

CREATE TABLE quiz (
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
descricao VARCHAR(45)
);

CREATE TABLE quizResposta (
idResposta INT AUTO_INCREMENT,
fkUsuario INT,
fkQuiz INT,
constraint pkComposta PRIMARY KEY (idResposta, fkUsuario, fkQuiz),
constraint fkUsuarioResposta FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
constraint fkquizPergunta FOREIGN KEY (fkQuiz) REFERENCES quiz(idQuiz),
RespostaCerta INT,
RespostaErrada INT,
BarracaEscolhida VARCHAR(45),
FeiraCoinPerdida DECIMAL, 
SaldoFinalFeiraCoin DECIMAL,
TempoResposta INT
); 