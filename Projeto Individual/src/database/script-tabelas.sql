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

CREATE TABLE quizPergunta (
idPergunta INT PRIMARY KEY AUTO_INCREMENT,
pergunta VARCHAR(45),
resposta VARCHAR(45)
);

CREATE TABLE quizResposta (
idResposta INT AUTO_INCREMENT,
fkUsuario INT,
fkPergunta INT,
constraint pkComposta PRIMARY KEY (idResposta, fkUsuario, fkPergunta),
constraint fkUsuarioResposta FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
constraint fkquizPergunta FOREIGN KEY (fkPergunta) REFERENCES quizPergunta(idPergunta),
statusResposta VARCHAR(45),
constraint chkresposta CHECK (statusResposta IN('correta', 'incorreta'))); 