var express = require("express");
var router = express.Router();

var quizRespostaController = require("../controllers/quizRespostaController");

router.post("/registrar", function (req, res) {
    quizRespostaController.registrar(req, res);
});

module.exports = router;