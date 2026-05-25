export function formatarData(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

export function formatarHora(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatarPrazo(date: Date) {
  return `${formatarData(date)} · ${formatarHora(date)}`;
}

export function estaAtrasada(dataVencimento: Date) {
  return dataVencimento.getTime() < Date.now();
}

export function mesclarDataHora(dataBase: Date, parteData: Date) {
  const proximaData = new Date(dataBase);
  proximaData.setFullYear(
    parteData.getFullYear(),
    parteData.getMonth(),
    parteData.getDate(),
  );
  return proximaData;
}

export function atualizarHora(dataBase: Date, parteHora: Date) {
  const proximaData = new Date(dataBase);
  proximaData.setHours(parteHora.getHours(), parteHora.getMinutes(), 0, 0);
  return proximaData;
}

export function obterDataDoInput(valor: string, fallback: Date) {
  if (!valor) return fallback;
  const dataParseada = new Date(`${valor}T00:00:00`);
  return isNaN(dataParseada.getTime()) ? fallback : dataParseada;
}

export function obterHoraDoInput(valor: string, fallback: Date) {
  if (!valor) return fallback;
  const [horas, minutos] = valor.split(":").map((parte) => Number(parte));
  if (Number.isNaN(horas) || Number.isNaN(minutos)) return fallback;
  const proximaData = new Date(fallback);
  proximaData.setHours(horas, minutos, 0, 0);
  return proximaData;
}

export function formatarDataParaInput(data: Date) {
  return data.toISOString().slice(0, 10);
}

export function formatarHoraParaInput(data: Date) {
  return data.toTimeString().slice(0, 5);
}