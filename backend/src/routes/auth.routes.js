const express = require("express");
const { cadastrar, login, perfil, editarPerfil, alterarSenha, excluirConta } = require("../controllers/auth.controller");
const autenticar = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/cadastro", cadastrar);
router.post("/login", login);

router.get("/perfil", autenticar, perfil);
router.patch("/perfil", autenticar, editarPerfil);
router.patch("/senha", autenticar, alterarSenha);
router.delete("/conta", autenticar, excluirConta);

module.exports = router;