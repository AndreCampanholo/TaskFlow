const express = require("express");
const { listar, criar, atualizar, deletar } = require("../controllers/tarefa.controller");
const autenticar = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(autenticar); // todas as rotas abaixo exigem login

router.get("/", listar);
router.post("/", criar);
router.patch("/:id", atualizar);
router.delete("/:id", deletar);

module.exports = router;