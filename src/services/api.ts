import AsyncStorage from "@react-native-async-storage/async-storage";

// Para dispositivo físico, troque por http://<IP_DA_SUA_MAQUINA>:3000
const BASE_URL = "http://localhost:3000";

async function getToken() {
  return await AsyncStorage.getItem("token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = await getToken();

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro na requisição");
  }

  return data;
}

export async function apiCadastrar(
  nome: string,
  cpf: string,
  email: string,
  dataNascimento: Date,
  senha: string,
) {
  return request("/auth/cadastro", {
    method: "POST",
    body: JSON.stringify({ nome, cpf, email, dataNascimento, senha }),
  });
}

export async function apiLogin(identificador: string, senha: string) {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ identificador, senha }),
  });
  await AsyncStorage.setItem("token", data.token);
  return data;
}

export async function apiLogout() {
  await AsyncStorage.removeItem("token");
}

export async function apiListarTarefas() {
  return request("/tarefas");
}

export async function apiCriarTarefa(tarefa: {
  titulo: string;
  descricao?: string;
  prazo?: string;
  estado?: string;
}) {
  return request("/tarefas", {
    method: "POST",
    body: JSON.stringify(tarefa),
  });
}

export async function apiAtualizarTarefa(
  id: number,
  dados: {
    titulo?: string;
    descricao?: string;
    prazo?: string;
    estado?: string;
    concluida?: boolean;
  },
) {
  return request(`/tarefas/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dados),
  });
}

export async function apiDeletarTarefa(id: number) {
  const token = await getToken();
  await fetch(`${BASE_URL}/tarefas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function apiGetPerfil() {
  return request("/auth/perfil");
}

export async function apiEditarPerfil(dados: {
  nome?: string;
  cpf?: string;
  email?: string;
  dataNascimento?: Date;
}) {
  return request("/auth/perfil", {
    method: "PATCH",
    body: JSON.stringify(dados),
  });
}

export async function apiAlterarSenha(senhaAtual: string, novaSenha: string) {
  return request("/auth/senha", {
    method: "PATCH",
    body: JSON.stringify({ senhaAtual, novaSenha }),
  });
}

export async function apiExcluirConta(senha: string) {
  return request("/auth/conta", {
    method: "DELETE",
    body: JSON.stringify({ senha }),
  });
}
