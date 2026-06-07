const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const listar = async (req, res) => {
  try {
    const tarefas = await prisma.tarefa.findMany({
      where: { usuarioId: req.usuarioId },
    });
    return res.json(tarefas);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao listar tarefas" });
  }
};

const criar = async (req, res) => {
  try {
    const { titulo, descricao, prazo, estado } = req.body;

    if (!titulo) {
      return res.status(400).json({ mensagem: "Título é obrigatório" });
    }

    const tarefa = await prisma.tarefa.create({
      data: {
        titulo,
        descricao: descricao ?? null,
        prazo: prazo ? new Date(prazo) : null,
        estado: estado ?? "em-andamento",
        usuarioId: req.usuarioId,
      },
    });

    return res.status(201).json(tarefa);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao criar tarefa" });
  }
};

const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, prazo, estado, concluida } = req.body;

    const tarefa = await prisma.tarefa.findUnique({ where: { id } });
    if (!tarefa || tarefa.usuarioId !== req.usuarioId) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" });
    }

    const tarefaAtualizada = await prisma.tarefa.update({
      where: { id },
      data: {
        titulo: titulo ?? tarefa.titulo,
        descricao: descricao ?? tarefa.descricao,
        prazo: prazo ? new Date(prazo) : tarefa.prazo,
        estado: estado ?? tarefa.estado,
        concluida: concluida ?? tarefa.concluida,
      },
    });

    return res.json(tarefaAtualizada);
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