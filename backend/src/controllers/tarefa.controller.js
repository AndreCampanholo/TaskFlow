const { PrismaClient } = require("@prisma/client");
 
const prisma = new PrismaClient();
 
// Recalcula o estado apenas quando nenhum estado explícito foi enviado.
// Se o frontend enviou um estado (ex: "em-andamento"), ele é respeitado,
// desde que não conflite com concluida=true.
function calcularEstado(tarefa, estadoExplicito) {
  if (tarefa.concluida) return "concluida";
  if (estadoExplicito && estadoExplicito !== "concluida") return estadoExplicito;
  if (tarefa.prazo && new Date(tarefa.prazo).getTime() < Date.now()) {
    return "atrasada";
  }
  return "em-andamento";
}
 
// Devolve a tarefa com o campo "estado" já calculado.
function comEstado(tarefa, estadoExplicito) {
  return { ...tarefa, estado: calcularEstado(tarefa, estadoExplicito) };
}
 
const listar = async (req, res) => {
  try {
    const { estado } = req.query;
 
    const tarefas = await prisma.tarefa.findMany({
      where: { usuarioId: req.usuarioId },
      orderBy: { criadoEm: "desc" },
    });
 
    // Na listagem, recalcula estado automaticamente (sem estado explícito)
    let resultado = tarefas.map((t) => comEstado(t, t.estado));
 
    if (estado) {
      const estadosValidos = ["em-andamento", "concluida", "atrasada"];
      if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ mensagem: "Estado de filtro inválido" });
      }
      resultado = resultado.filter((t) => t.estado === estado);
    }
 
    return res.json(resultado);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao listar tarefas" });
  }
};
 
const criar = async (req, res) => {
  try {
    const { titulo, descricao, prazo } = req.body;
 
    if (!titulo) {
      return res.status(400).json({ mensagem: "Título é obrigatório" });
    }
 
    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao: descricao ?? null,
        prazo: prazo ? new Date(prazo) : null,
        concluida: false,
        usuarioId: req.usuarioId,
      },
    });
 
    return res.status(201).json(comEstado(tarefa, null));
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao criar tarefa" });
  }
};
 
const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, prazo, concluida, estado } = req.body;
 
    const tarefa = await prisma.tarefa.findUnique({ where: { id } });
    if (!tarefa || tarefa.usuarioId !== req.usuarioId) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
 
    // Se concluida for enviado explicitamente como false, aceita.
    // O operador ?? preserva false, diferente de ||.
    const novaConcluida = concluida ?? tarefa.concluida;

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: {
        titulo: titulo ?? tarefa.titulo,
        descricao: descricao ?? tarefa.descricao,
        prazo: prazo ? new Date(prazo) : tarefa.prazo,
        concluida: novaConcluida,
      },
    });
 
    // Respeita o estado explícito enviado pelo frontend
    return res.json(comEstado(tarefaAtualizada, estado));
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao atualizar tarefa" });
  }
};
 
const deletar = async (req, res) => {
  try {
    const id = Number(req.params.id);
 
    const tarefa = await prisma.tarefa.findUnique({ where: { id } });
    if (!tarefa || tarefa.usuarioId !== req.usuarioId) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }
 
    await prisma.tarefa.delete({ where: { id } });
 
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao deletar tarefa" });
  }
};
 
module.exports = { listar, criar, atualizar, deletar };
