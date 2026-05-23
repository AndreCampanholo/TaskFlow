export function formatTaskDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

export function formatTaskTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTaskDueLabel(date: Date) {
  return `${formatTaskDate(date)} · ${formatTaskTime(date)}`;
}

export function isTaskOverdue(dueDate: Date) {
  return dueDate.getTime() < Date.now();
}

export function mergeTaskDateTime(baseDate: Date, datePart: Date) {
  const next = new Date(baseDate);
  next.setFullYear(datePart.getFullYear(), datePart.getMonth(), datePart.getDate());
  return next;
}

export function updateTaskTime(baseDate: Date, timePart: Date) {
  const next = new Date(baseDate);
  next.setHours(timePart.getHours(), timePart.getMinutes(), 0, 0);
  return next;
}

export function fromDateInputValue(value: string, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(`${value}T00:00:00`);
  return isNaN(parsed.getTime()) ? fallback : parsed;
}

export function fromTimeInputValue(value: string, fallback: Date) {
  if (!value) return fallback;
  const [hours, minutes] = value.split(":").map((part) => Number(part));
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return fallback;
  const next = new Date(fallback);
  next.setHours(hours, minutes, 0, 0);
  return next;
}

export function toDateInputValue(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function toTimeInputValue(date: Date) {
  return date.toTimeString().slice(0, 5);
}