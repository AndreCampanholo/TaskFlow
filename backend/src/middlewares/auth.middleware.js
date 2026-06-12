const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer TOKEN"

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = dados.id;
    next();
  } catch {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
};

module.exports = autenticar;