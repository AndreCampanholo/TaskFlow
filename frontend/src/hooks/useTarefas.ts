import {
  apiAtualizarTarefa,
  apiCriarTarefa,
  apiDeletarTarefa,
  apiListarTarefas,
} from "@/src/services/api";
import { estaAtrasada, formatarPrazo } from "@/src/utils/taskDates";
import { useEffect, useState } from "react";

export type EstadoTarefa = "em-andamento" | "concluida" | "atrasada";

export type Tarefa = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  dueLabel: string;
  state: EstadoTarefa;
  completed: boolean;
};

type TaskInput = {
  title: string;
  description: string;
  dueDate: Date;
  stateFromModal: EstadoTarefa;
};

type AtualizacaoTarefa = {
  title?: string;
  description?: string;
  dueDate?: Date;
  state?: EstadoTarefa;
  completed?: boolean;
};

// Converte o formato do backend para o formato do frontend
function converterTarefa(t: any): Tarefa {
  const dueDate = t.prazo ? new Date(t.prazo) : new Date();
  return {
    id: String(t.id),
    title: t.titulo,
    description: t.descricao ?? "",
    dueDate,
    dueLabel: formatarPrazo(dueDate),
    state: (t.estado as EstadoTarefa) ?? "em-andamento",
    completed: t.concluida,
  };
}

export default function useTarefas() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  // Carrega as tarefas do backend ao montar o componente
  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const dados = await apiListarTarefas();
      setTarefas(dados.map(converterTarefa));
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
    }
  }

  async function criarTarefa({ title, description, dueDate, stateFromModal }: TaskInput) {
    try {
      const concluida = stateFromModal === "concluida";
      const estado = concluida
        ? "concluida"
        : stateFromModal === "atrasada" || estaAtrasada(dueDate)
        ? "atrasada"
        : "em-andamento";

      const nova = await apiCriarTarefa({
        titulo: title.trim(),
        descricao: description.trim(),
        prazo: dueDate.toISOString(),
        estado,
      });

      setTarefas((prev) => [converterTarefa(nova), ...prev]);
    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
    }
  }

  async function atualizarTarefa(id: string, atualizacoes: AtualizacaoTarefa) {
    try {
      const atualizada = await apiAtualizarTarefa(Number(id), {
        titulo: atualizacoes.title,
        descricao: atualizacoes.description,
        prazo: atualizacoes.dueDate?.toISOString(),
        estado: atualizacoes.state,
        concluida: atualizacoes.completed,
      });

      // Atualiza o item na lista local com o retorno do backend
      setTarefas((prev) =>
        prev.map((t) => (t.id === id ? converterTarefa(atualizada) : t))
      );
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  async function excluirTarefa(id: string) {
    try {
      await apiDeletarTarefa(Number(id));
      setTarefas((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }

  async function alternarTarefa(id: string) {
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    const vaiSerConcluida = !tarefa.completed;
    const novoEstado: EstadoTarefa = vaiSerConcluida
      ? "concluida"
      : estaAtrasada(tarefa.dueDate)
      ? "atrasada"
      : "em-andamento";

    // Atualiza localmente de imediato (feedback visual instantâneo)
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, completed: vaiSerConcluida, state: novoEstado }
          : t
      )
    );

    // Persiste no backend
    await atualizarTarefa(id, {
      completed: vaiSerConcluida,
      state: novoEstado,
    });
  }

  function obterTarefaPorId(id: string) {
    return tarefas.find((t) => t.id === id) ?? null;
  }

  function obterFiltradas(filtro: "all" | EstadoTarefa) {
    if (filtro === "all") return tarefas;
    return tarefas.filter((t) => t.state === filtro);
  }

  return {
    tarefas,
    criarTarefa,
    atualizarTarefa,
    excluirTarefa,
    alternarTarefa,
    obterFiltradas,
    obterTarefaPorId,
    carregarTarefas,
  } as const;
}
