import { useEffect, useSyncExternalStore } from "react";
import { formatTaskDueLabel, isTaskOverdue } from "@/src/utils/taskDates";

export type TaskState = "em-andamento" | "concluida" | "atrasada";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  dueLabel: string;
  state: TaskState;
  completed: boolean;
};

type TaskInput = {
  title: string;
  description: string;
  dueDate: Date;
  stateFromModal: TaskState;
};

type TaskUpdate = Partial<Pick<Task, "title" | "description" | "dueDate" | "state" | "completed">>;

let taskState: Task[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return taskState;
}

function normalizeTask(task: Task): Task {
  return {
    ...task,
    dueLabel: formatTaskDueLabel(task.dueDate),
  };
}

function buildTask({ title, description, dueDate, stateFromModal }: TaskInput): Task {
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();
  const completed = stateFromModal === "concluida";
  const state = completed
    ? "concluida"
    : stateFromModal === "atrasada" || isTaskOverdue(dueDate)
      ? "atrasada"
      : "em-andamento";

  return normalizeTask({
    id: String(Date.now()),
    title: trimmedTitle,
    description: trimmedDescription,
    dueDate,
    dueLabel: formatTaskDueLabel(dueDate),
    state,
    completed,
  });
}

function mutateTask(id: string, updater: (task: Task) => Task) {
  taskState = taskState.map((task) => (task.id === id ? normalizeTask(updater(task)) : task));
  notify();
}

function createTask({ title, description, dueDate, stateFromModal }: TaskInput) {
  const nextTask = buildTask({ title, description, dueDate, stateFromModal });
  taskState = [nextTask, ...taskState];
  notify();
}

function updateTask(id: string, updates: TaskUpdate) {
  mutateTask(id, (task) => {
    const nextTitle = updates.title?.trim() ?? task.title;
    const nextDescription = updates.description?.trim() ?? task.description;
    const nextDueDate = updates.dueDate ?? task.dueDate;
    const nextCompleted = updates.completed ?? task.completed;

    let nextState = updates.state ?? task.state;
    if (nextCompleted) {
      nextState = "concluida";
    } else if (nextState === "concluida") {
      nextState = isTaskOverdue(nextDueDate) ? "atrasada" : "em-andamento";
    } else if (!updates.state && !updates.completed) {
      nextState = isTaskOverdue(nextDueDate) ? "atrasada" : "em-andamento";
    }

    return {
      ...task,
      title: nextTitle,
      description: nextDescription,
      dueDate: nextDueDate,
      state: nextState,
      completed: nextCompleted,
    };
  });
}

function deleteTask(id: string) {
  taskState = taskState.filter((task) => task.id !== id);
  notify();
}

function toggleTask(id: string) {
  mutateTask(id, (task) => {
    const willBeCompleted = !task.completed;
    if (willBeCompleted) {
      return { ...task, completed: true, state: "concluida" };
    }

    return {
      ...task,
      completed: false,
      state: isTaskOverdue(task.dueDate) ? "atrasada" : "em-andamento",
    };
  });
}

function getTaskById(id: string) {
  return taskState.find((task) => task.id === id) ?? null;
}

export default function useTasks(initial: Task[] = []) {
  useEffect(() => {
    if (taskState.length === 0 && initial.length > 0) {
      taskState = initial.map(normalizeTask);
      notify();
    }
  }, [initial]);

  const tasks = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  function getFiltered(filter: "all" | TaskState) {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.state === filter);
  }

  return {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    getFiltered,
    getTaskById,
  } as const;
}
