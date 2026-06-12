require("dotenv").config();
 
const express = require("express");
const cors = require("cors");
 
const authRoutes = require("./src/routes/auth.routes");
const tarefaRoutes = require("./src/routes/tarefa.routes");
 
const app = express();
 
app.use(cors());
app.use(express.json());
 
app.get("/", (req, res) => {
  res.json({
    status: "online",
    rotas: {
      auth: [
        "POST /auth/cadastro",
        "POST /auth/login",
        "GET /auth/perfil",
        "PATCH /auth/perfil",
        "PATCH /auth/senha",
        "DELETE /auth/conta",
      ],
      tarefas: [
        "GET /tarefas",
        "GET /tarefas?estado=em-andamento|concluida|atrasada",
        "POST /tarefas",
        "PATCH /tarefas/:id",
        "DELETE /tarefas/:id",
      ],
    },
  });
});
 
app.use("/auth", authRoutes);
app.use("/tarefas", tarefaRoutes);
 
// Railway injeta a porta via process.env.PORT; localmente cai no 3000.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});