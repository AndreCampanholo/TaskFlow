import { useState } from "react";

export type Task = {
  id: string;
  title: string;
  dueLabel: string;
  dueIso?: string | null;
  state: "em-andamento" | "concluida" | "atrasada";
  completed: boolean;
};

export default function useTasks(initial: Task[] = []) {
  const [tasks, setTasks] = useState<Task[]>(initial);

  function createTask(
    title: string,
    due: string,
    stateFromModal: Task["state"],
  ) {
    const dueTrim = due.trim();
    let dueIso: string | null = null;
    if (dueTrim) {
      const parsed = new Date(dueTrim);
      if (!isNaN(parsed.getTime())) {
        dueIso = parsed.toISOString();
      }
    }

    const state = stateFromModal;
    const completed = state === "concluida";

    const t: Task = {
      id: String(Date.now()),
      title: title.trim(),
      dueLabel: dueTrim || "Sem prazo",
      dueIso,
      state,
      completed,
    };

    setTasks((s) => [t, ...s]);
  }

  function toggleTask(id: string) {
    setTasks((s) =>
      s.map((t) => {
        if (t.id !== id) return t;
        const willBeCompleted = !t.completed;
        if (willBeCompleted) {
          return { ...t, completed: true, state: "concluida" };
        }
        if (t.dueIso) {
          const parsed = new Date(t.dueIso);
          const today = new Date();
          parsed.setHours(0, 0, 0, 0);
          today.setHours(0, 0, 0, 0);
          return {
            ...t,
            completed: false,
            state: parsed < today ? "atrasada" : "em-andamento",
          };
        }
        return { ...t, completed: false, state: "em-andamento" };
      }),
    );
  }

  function getFiltered(filter: "all" | Task["state"]) {
    if (filter === "all") return tasks;
    return tasks.filter((t) => t.state === filter);
  }

  return { tasks, createTask, toggleTask, getFiltered } as const;
}
