import { estaAtrasada, formatarPrazo } from "@/src/utils/taskDates";
import { useEffect, useSyncExternalStore } from "react";

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

type TaskUpdate = Partial<
  Pick<Tarefa, "title" | "description" | "dueDate" | "state" | "completed">
>;

type EntradaTarefa = {
  title: string;
  description: string;
  dueDate: Date;
  estadoSelecionado: EstadoTarefa;
};

type AtualizacaoTarefa = Partial<
  Pick<Tarefa, "title" | "description" | "dueDate" | "state" | "completed">
>;

let tarefas: Tarefa[] = [];
const ouvintes = new Set<() => void>();

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

function inscrever(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

function obterSnapshot() {
  return tarefas;
}

function normalizarTarefa(tarefa: Tarefa): Tarefa {
  return {
    ...tarefa,
    dueLabel: formatarPrazo(tarefa.dueDate),
  };
}

function montarTarefa({
  title,
  description,
  dueDate,
  stateFromModal,
}: TaskInput): Tarefa {
  const titulo = title.trim();
  const descricao = description.trim();
  const concluida = stateFromModal === "concluida";
  const estado = concluida
    ? "concluida"
    : stateFromModal === "atrasada" || estaAtrasada(dueDate)
      ? "atrasada"
      : "em-andamento";

  return normalizarTarefa({
    id: String(Date.now()),
    title: titulo,
    description: descricao,
    dueDate,
    dueLabel: formatarPrazo(dueDate),
    state: estado,
    completed: concluida,
  });
}

function alterarTarefa(id: string, atualizar: (tarefa: Tarefa) => Tarefa) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? normalizarTarefa(atualizar(tarefa)) : tarefa,
  );
  notificar();
}

function criarTarefa({
  title,
  description,
  dueDate,
  stateFromModal,
}: TaskInput) {
  const novaTarefa = montarTarefa({
    title,
    description,
    dueDate,
    stateFromModal,
  });
  tarefas = [novaTarefa, ...tarefas];
  notificar();
}

function atualizarTarefa(id: string, atualizacoes: AtualizacaoTarefa) {
  alterarTarefa(id, (tarefa) => {
    const proximoTitulo = atualizacoes.title?.trim() ?? tarefa.title;
    const proximaDescricao =
      atualizacoes.description?.trim() ?? tarefa.description;
    const proximaDataVencimento = atualizacoes.dueDate ?? tarefa.dueDate;
    const concluida = atualizacoes.completed ?? tarefa.completed;

    let proximoEstado = atualizacoes.state ?? tarefa.state;
    if (concluida) {
      proximoEstado = "concluida";
    } else if (proximoEstado === "concluida") {
      proximoEstado = estaAtrasada(proximaDataVencimento)
        ? "atrasada"
        : "em-andamento";
    } else if (!atualizacoes.state && !atualizacoes.completed) {
      proximoEstado = estaAtrasada(proximaDataVencimento)
        ? "atrasada"
        : "em-andamento";
    }

    return {
      ...tarefa,
      title: proximoTitulo,
      description: proximaDescricao,
      dueDate: proximaDataVencimento,
      state: proximoEstado,
      completed: concluida,
    };
  });
}

function excluirTarefa(id: string) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  notificar();
}

function alternarTarefa(id: string) {
  alterarTarefa(id, (tarefa) => {
    const vaiSerConcluida = !tarefa.completed;
    if (vaiSerConcluida) {
      return { ...tarefa, completed: true, state: "concluida" };
    }

    return {
      ...tarefa,
      completed: false,
      state: estaAtrasada(tarefa.dueDate) ? "atrasada" : "em-andamento",
    };
  });
}

function obterTarefaPorId(id: string) {
  return tarefas.find((tarefa) => tarefa.id === id) ?? null;
}

export default function useTarefas(tarefasIniciais: Tarefa[] = []) {
  useEffect(() => {
    if (tarefas.length === 0 && tarefasIniciais.length > 0) {
      tarefas = tarefasIniciais.map(normalizarTarefa);
      notificar();
    }
  }, [tarefasIniciais]);

  const tarefasEmTela = useSyncExternalStore(
    inscrever,
    obterSnapshot,
    obterSnapshot,
  );

  function obterFiltradas(filtro: "all" | EstadoTarefa) {
    if (filtro === "all") return tarefasEmTela;
    return tarefasEmTela.filter((tarefa) => tarefa.state === filtro);
  }

  return {
    tarefas: tarefasEmTela,
    criarTarefa,
    atualizarTarefa,
    excluirTarefa,
    alternarTarefa,
    obterFiltradas,
    obterTarefaPorId,
  } as const;
}
