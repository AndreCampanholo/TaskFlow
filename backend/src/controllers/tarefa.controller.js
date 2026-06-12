const { PrismaClient } = require("@prisma/client");
 
const prisma = new PrismaClient();
 
// Regra única de negócio para o estado da tarefa (Requisito 7).
// O estado NÃO é confiado ao que veio gravado: é sempre recalculado a partir
// de "concluida" + "prazo" vs. o momento atual. Assim uma tarefa cujo prazo
// venceu vira "atrasada" automaticamente na próxima leitura.
function calcularEstado(tarefa) {
  if (tarefa.concluida) return "concluida";
  if (tarefa.prazo && new Date(tarefa.prazo).getTime() < Date.now()) {
    return "atrasada";
  }
  return "em-andamento";
}
 
// Devolve a tarefa com o campo "estado" já recalculado.
function comEstado(tarefa) {
  return { ...tarefa, estado: calcularEstado(tarefa) };
}
 
const listar = async (req, res) => {
  try {
    // Filtro opcional: GET /tarefas?estado=em-andamento|concluida|atrasada
    const { estado } = req.query;
 
    const tarefas = await prisma.tarefa.findMany({
      where: { usuarioId: req.usuarioId },
      orderBy: { criadoEm: "desc" },
    });
 
    let resultado = tarefas.map(comEstado);
 
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
        // "estado" não é mais recebido do cliente: é derivado na leitura.
      },
    });
 
    return res.status(201).json(comEstado(tarefa));
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao criar tarefa" });
  }
};
 
const atualizar = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, prazo, concluida } = req.body;
 
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
        concluida: concluida ?? tarefa.concluida,
      },
    });
 
    return res.json(comEstado(tarefaAtualizada));
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