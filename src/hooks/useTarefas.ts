import { estaAtrasada, formatarPrazo } from "@/src/utils/taskDates";
import { useEffect, useSyncExternalStore } from "react";

// Valores possíveis para o status de uma tarefa
export type EstadoTarefa = "em-andamento" | "concluida" | "atrasada";

// Estrutura completa da tarefa usada pelo app
export type Tarefa = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  dueLabel: string;
  state: EstadoTarefa;
  completed: boolean;
};

// Dados recebidos ao criar uma nova tarefa
type TaskInput = {
  title: string;
  description: string;
  dueDate: Date;
  stateFromModal: EstadoTarefa;
};

// Formato parcial usado para atualizar somente alguns campos da tarefa
type TaskUpdate = Partial<
  Pick<Tarefa, "title" | "description" | "dueDate" | "state" | "completed">
>;

// Estrutura parecida com os dados do formulário antigo de criação
type EntradaTarefa = {
  title: string;
  description: string;
  dueDate: Date;
  estadoSelecionado: EstadoTarefa;
};

// Tipo equivalente ao update da tarefa, usado na lógica interna
type AtualizacaoTarefa = Partial<
  Pick<Tarefa, "title" | "description" | "dueDate" | "state" | "completed">
>;

// Lista em memória com todas as tarefas do app
let tarefas: Tarefa[] = [];
// Conjunto de ouvintes que precisam ser avisados quando a lista mudar
const ouvintes = new Set<() => void>();

// Notifica todos os componentes inscritos de que o estado mudou
function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

// Registra um novo ouvinte e devolve a função de cancelamento da inscrição
function inscrever(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

// Entrega o snapshot atual da lista para o useSyncExternalStore
function obterSnapshot() {
  return tarefas;
}

// Recalcula o texto formatado do prazo para manter a tarefa consistente na UI
function normalizarTarefa(tarefa: Tarefa): Tarefa {
  return {
    ...tarefa,
    dueLabel: formatarPrazo(tarefa.dueDate),
  };
}

// Monta uma tarefa nova, limpando campos, ajustando o status e preenchendo o rótulo do prazo
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

// Atualiza uma tarefa existente usando uma função transformadora
function alterarTarefa(id: string, atualizar: (tarefa: Tarefa) => Tarefa) {
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === id ? normalizarTarefa(atualizar(tarefa)) : tarefa,
  );
  notificar();
}

// Cria uma nova tarefa e a coloca no topo da lista
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

// Atualiza campos específicos da tarefa e recalcula regras de status/conclusão
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

// Remove uma tarefa pelo id
function excluirTarefa(id: string) {
  tarefas = tarefas.filter((tarefa) => tarefa.id !== id);
  notificar();
}

// Alterna a conclusão da tarefa e ajusta o status correspondente
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

// Busca uma tarefa específica pelo id; retorna null se não existir
function obterTarefaPorId(id: string) {
  return tarefas.find((tarefa) => tarefa.id === id) ?? null;
}

// Hook principal que expõe a lista e as operações para os componentes
export default function useTarefas(tarefasIniciais: Tarefa[] = []) {
  // Inicializa o store em memória com dados de entrada, se ainda estiver vazio
  useEffect(() => {
    if (tarefas.length === 0 && tarefasIniciais.length > 0) {
      tarefas = tarefasIniciais.map(normalizarTarefa);
      notificar();
    }
  }, [tarefasIniciais]);

  // Liga o componente ao store externo em memória
  const tarefasEmTela = useSyncExternalStore(
    inscrever,
    obterSnapshot,
    obterSnapshot,
  );

  // Retorna apenas as tarefas que batem com o filtro selecionado
  function obterFiltradas(filtro: "all" | EstadoTarefa) {
    if (filtro === "all") return tarefasEmTela;
    return tarefasEmTela.filter((tarefa) => tarefa.state === filtro);
  }

  // Expõe os dados e ações que os componentes da interface usam
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
