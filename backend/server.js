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
      auth: ["POST /auth/cadastro", "POST /auth/login"],
      tarefas: ["GET /tarefas", "POST /tarefas", "PATCH /tarefas/:id", "DELETE /tarefas/:id"],
    },
  });
});

app.use("/auth", authRoutes);
app.use("/tarefas", tarefaRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});