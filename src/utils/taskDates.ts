// Formata uma data para o padrão pt-BR
export function formatarData(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

// Formata a hora para exibição curta no padrão pt-BR
export function formatarHora(date: Date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Junta a data e a hora em um único texto para exibição na interface
export function formatarPrazo(date: Date) {
  return `${formatarData(date)} · ${formatarHora(date)}`;
}

// Verifica se a data de vencimento já passou em relação ao momento atual
export function estaAtrasada(dataVencimento: Date) {
  return dataVencimento.getTime() < Date.now();
}

// Mantém a hora original e substitui apenas a parte da data
export function mesclarDataHora(dataBase: Date, parteData: Date) {
  const proximaData = new Date(dataBase);
  proximaData.setFullYear(
    parteData.getFullYear(),
    parteData.getMonth(),
    parteData.getDate(),
  );
  return proximaData;
}

// Mantém a data original e atualiza apenas horas e minutos
export function atualizarHora(dataBase: Date, parteHora: Date) {
  const proximaData = new Date(dataBase);
  proximaData.setHours(parteHora.getHours(), parteHora.getMinutes(), 0, 0);
  return proximaData;
}

// Converte o valor do input de data para Date; se falhar, usa o fallback
export function obterDataDoInput(valor: string, fallback: Date) {
  if (!valor) return fallback;
  const dataParseada = new Date(`${valor}T00:00:00`);
  return isNaN(dataParseada.getTime()) ? fallback : dataParseada;
}

// Converte o valor do input de hora para Date; se falhar, usa o fallback
export function obterHoraDoInput(valor: string, fallback: Date) {
  if (!valor) return fallback;
  const [horas, minutos] = valor.split(":").map((parte) => Number(parte));
  if (Number.isNaN(horas) || Number.isNaN(minutos)) return fallback;
  const proximaData = new Date(fallback);
  proximaData.setHours(horas, minutos, 0, 0);
  return proximaData;
}

// Formata a data no formato exigido pelo input type="date"
export function formatarDataParaInput(data: Date) {
  return data.toISOString().slice(0, 10);
}

// Formata a hora no formato exigido pelo input type="time"
export function formatarHoraParaInput(data: Date) {
  return data.toTimeString().slice(0, 5);
}
