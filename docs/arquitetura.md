# Arquitetura

## 1. Visão Geral

O **TaskFlow** é um gerenciador de tarefas composto por duas aplicações independentes que se comunicam via API REST:

- **Front-end**: aplicativo mobile desenvolvido em **React Native (Expo)**, com estilização em CSS.
- **Back-end**: API REST desenvolvida em **Node.js + Express**, com persistência de dados via **Prisma ORM** sobre banco **SQLite**.

A comunicação entre as duas partes ocorre via requisições HTTP (JSON), com autenticação baseada em **token JWT** (Bearer Token).

## 2. Diagrama de Componentes

```
FRONT-END (React Native / Expo - porta 8081)
+------------------------------------------+
| Telas (app/) e Componentes                |
| services/api.ts  -- chamadas a API        |
| AsyncStorage     -- armazena token JWT    |
+------------------------------------------+
              |
              |  HTTP / JSON
              |  Authorization: Bearer <token>
              v
BACK-END (Node.js / Express - porta 3000)
+------------------------------------------+
| Rotas (src/routes/)                       |
|   - auth.routes.js                        |
|   - tarefa.routes.js                      |
+------------------------------------------+
              |
              v
+------------------------------------------+
| Prisma ORM (acesso ao banco)              |
+------------------------------------------+
              |
              v
+------------------------------------------+
| SQLite (banco de dados)                   |
+------------------------------------------+
```

## 3. Responsabilidades dos Módulos

### 3.1 Front-end (React Native / Expo)

- **app/**: telas e navegação do aplicativo.
- **components/**: componentes reutilizáveis (botões, cards, inputs etc.).
- **services/api.ts**: camada responsável por toda comunicação com a API do back-end. Centraliza as funções de requisição (`apiLogin`, `apiListarTarefas`, `apiCriarTarefa` etc.), o envio do token de autenticação e o tratamento básico de erros.
- **hooks/**: lógica reutilizável (ex.: hooks de autenticação, de tarefas).
- **types/**: tipagens TypeScript compartilhadas entre as telas.
- **AsyncStorage**: usado para persistir o token JWT no dispositivo, mantendo o usuário autenticado entre sessões.

### 3.2 Back-end (Node.js / Express / Prisma)

- **server.js**: ponto de entrada da aplicação. Configura o Express, middlewares globais (CORS, parsing de JSON) e registra as rotas principais (`/auth` e `/tarefas`).
- **src/routes/**: define os endpoints disponíveis e direciona cada requisição para o controller responsável.
- **Prisma**: camada de acesso ao banco de dados, responsável por mapear os modelos (User, Tarefa) para tabelas no SQLite e executar consultas/alterações.
- **SQLite**: banco de dados relacional leve, armazenado em arquivo, usado para persistência dos dados da aplicação.

## 4. Fluxo de Dados

### Exemplo 1 — Login

1. Usuário preenche login e senha na tela de autenticação do app.
2. O front-end chama `apiLogin(identificador, senha)`, que envia `POST /auth/login` para `http://localhost:3000`.
3. O back-end (rota `auth.routes.js`) valida as credenciais via Prisma, consultando o usuário no SQLite.
4. Se válido, o back-end retorna um token JWT.
5. O front-end armazena o token no `AsyncStorage`, usando-o em todas as requisições futuras no header `Authorization: Bearer <token>`.

### Exemplo 2 — Listagem de Tarefas

1. O front-end chama `apiListarTarefas()`, que envia `GET /tarefas` incluindo o token salvo no `AsyncStorage`.
2. O back-end valida o token (middleware de autenticação), identifica o usuário e consulta as tarefas correspondentes via Prisma.
3. O back-end retorna a lista de tarefas em JSON.
4. O front-end recebe os dados e renderiza na tela.

## 5. Comunicação Front-end ↔ Back-end

- **Protocolo**: HTTP/REST, payloads em JSON.
- **URL base**: `http://localhost:3000` (em dispositivo físico, deve ser substituída pelo IP da máquina que executa o back-end).
- **Autenticação**: Bearer Token (JWT), enviado no header `Authorization`.
- **Portas**:
  - Front-end (Expo): `8081`
  - Back-end (Express): `3000`

## 6. Tecnologias Principais

| Camada     | Tecnologias                                  |
|------------|-----------------------------------------------|
| Front-end  | React Native, Expo, TypeScript, CSS, AsyncStorage |
| Back-end   | Node.js, Express, Prisma ORM, SQLite, JWT, CORS |