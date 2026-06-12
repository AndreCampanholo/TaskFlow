# API

## Versão

`v1` (sem prefixo de versão nas rotas atuais — todas as rotas partem diretamente de `/auth` e `/tarefas`).

## Autenticação

A API utiliza **JWT (JSON Web Token)**.

- Após o login (`POST /auth/login`), o servidor retorna um `token`.
- Esse token deve ser enviado em todas as rotas protegidas no header:

```
Authorization: Bearer <token>
```

- O middleware `auth.middleware.js` valida o token usando a variável de ambiente `JWT_SECRET` e disponibiliza o id do usuário autenticado em `req.usuarioId`.
- Se o token não for enviado ou for inválido/expirado, a API responde com `401`.

---

## Endpoints

### Autenticação (`/auth`)

#### POST /auth/cadastro
Descrição: cria um novo usuário.

Autenticação: não requer.

Request Body:
```json
{
  "nome": "string",
  "cpf": "string",
  "email": "string",
  "dataNascimento": "string (DD/MM/AAAA ou ISO 8601)",
  "senha": "string"
}
```

Response 201:
```json
{
  "mensagem": "Usuário criado",
  "id": 1
}
```

Possíveis erros: `400` (campo obrigatório faltando, data de nascimento inválida, CPF ou email já cadastrados), `500`.

---

#### POST /auth/login
Descrição: autentica o usuário e retorna um token JWT.

Autenticação: não requer.

Request Body:
```json
{
  "identificador": "string (email ou cpf)",
  "senha": "string"
}
```

Response 200:
```json
{
  "token": "string (JWT, expira em 7 dias)"
}
```

Possíveis erros: `400` (campos faltando), `401` (identificador ou senha incorretos), `500`.

---

#### GET /auth/perfil
Descrição: retorna os dados do usuário autenticado.

Autenticação: requerida (Bearer Token).

Response 200:
```json
{
  "id": 1,
  "nome": "string",
  "cpf": "string",
  "email": "string",
  "dataNascimento": "2000-01-01T00:00:00.000Z",
  "criadoEm": "2025-06-01T12:00:00.000Z"
}
```

Possíveis erros: `401` (token ausente/inválido), `404` (usuário não encontrado), `500`.

---

#### PATCH /auth/perfil
Descrição: atualiza dados do perfil do usuário autenticado. É necessário enviar ao menos um campo.

Autenticação: requerida (Bearer Token).

Request Body (todos os campos opcionais, mas ao menos um deve ser enviado):
```json
{
  "nome": "string",
  "cpf": "string",
  "email": "string",
  "dataNascimento": "string (DD/MM/AAAA ou ISO 8601)"
}
```

Response 200:
```json
{
  "id": 1,
  "nome": "string",
  "cpf": "string",
  "email": "string",
  "dataNascimento": "2000-01-01T00:00:00.000Z"
}
```

Possíveis erros: `400` (nenhum campo informado, email/cpf já em uso, data inválida), `401`, `500`.

---

#### PATCH /auth/senha
Descrição: altera a senha do usuário autenticado.

Autenticação: requerida (Bearer Token).

Request Body:
```json
{
  "senhaAtual": "string",
  "novaSenha": "string"
}
```

Response 200:
```json
{
  "mensagem": "Senha alterada com sucesso"
}
```

Possíveis erros: `400` (campos faltando), `401` (senha atual incorreta), `500`.

---

#### DELETE /auth/conta
Descrição: exclui permanentemente a conta do usuário autenticado e todas as suas tarefas.

Autenticação: requerida (Bearer Token).

Request Body:
```json
{
  "senha": "string"
}
```

Response 200:
```json
{
  "mensagem": "Conta excluída com sucesso"
}
```

Possíveis erros: `400` (senha não informada), `401` (senha incorreta), `500`.

---

### Tarefas (`/tarefas`)

> Todas as rotas abaixo exigem autenticação (Bearer Token) e operam apenas sobre as tarefas do usuário autenticado.

#### GET /tarefas
Descrição: lista as tarefas do usuário autenticado. Suporta filtro opcional por estado via query string.

Query Params:
- `estado` (opcional): `em-andamento` | `concluida` | `atrasada`

Exemplo: `GET /tarefas?estado=atrasada`

Response 200:
```json
[
  {
    "id": 1,
    "titulo": "string",
    "descricao": "string | null",
    "concluida": false,
    "prazo": "2025-06-20T00:00:00.000Z | null",
    "usuarioId": 1,
    "criadoEm": "2025-06-01T12:00:00.000Z",
    "estado": "em-andamento | concluida | atrasada"
  }
]
```

Possíveis erros: `400` (valor de `estado` inválido), `401`, `500`.

---

#### POST /tarefas
Descrição: cria uma nova tarefa para o usuário autenticado.

Request Body:
```json
{
  "titulo": "string (obrigatório)",
  "descricao": "string (opcional)",
  "prazo": "string ISO 8601 (opcional)"
}
```

Response 201:
```json
{
  "id": 1,
  "titulo": "string",
  "descricao": "string | null",
  "concluida": false,
  "prazo": "2025-06-20T00:00:00.000Z | null",
  "usuarioId": 1,
  "criadoEm": "2025-06-01T12:00:00.000Z",
  "estado": "em-andamento"
}
```

Possíveis erros: `400` (título não informado), `401`, `500`.

---

#### PATCH /tarefas/:id
Descrição: atualiza uma tarefa existente do usuário autenticado.

Request Body (todos os campos opcionais):
```json
{
  "titulo": "string",
  "descricao": "string",
  "prazo": "string ISO 8601",
  "concluida": true
}
```

Response 200:
```json
{
  "id": 1,
  "titulo": "string",
  "descricao": "string | null",
  "concluida": true,
  "prazo": "2025-06-20T00:00:00.000Z | null",
  "usuarioId": 1,
  "criadoEm": "2025-06-01T12:00:00.000Z",
  "estado": "concluida"
}
```

Possíveis erros: `401`, `404` (tarefa não encontrada ou não pertence ao usuário), `500`.

---

#### DELETE /tarefas/:id
Descrição: remove uma tarefa do usuário autenticado.

Response: `204 No Content` (sem corpo).

Possíveis erros: `401`, `404` (tarefa não encontrada ou não pertence ao usuário), `500`.

---

## Modelos

### Usuario

| Campo           | Tipo       | Observações                              |
|-----------------|------------|-------------------------------------------|
| `id`            | Int        | Chave primária, autoincremento.           |
| `nome`          | String     | —                                          |
| `cpf`           | String     | Único.                                     |
| `email`         | String     | Único.                                     |
| `dataNascimento`| DateTime   | —                                          |
| `senha`         | String     | Armazenada com hash (bcrypt). Nunca retornada nas respostas. |
| `tarefas`       | Tarefa[]   | Relação 1:N com Tarefa.                    |
| `criadoEm`      | DateTime   | Definido automaticamente na criação.       |

### Tarefa

| Campo       | Tipo      | Observações                                                                 |
|-------------|-----------|------------------------------------------------------------------------------|
| `id`        | Int       | Chave primária, autoincremento.                                              |
| `titulo`    | String    | Obrigatório.                                                                  |
| `descricao` | String?   | Opcional.                                                                     |
| `concluida` | Boolean   | Padrão `false`.                                                               |
| `estado`    | String    | Campo existente no banco, mas **não é confiado diretamente**: é recalculado a cada leitura a partir de `concluida` e `prazo` (ver regra abaixo). |
| `prazo`     | DateTime? | Opcional.                                                                      |
| `usuarioId` | Int       | Chave estrangeira para `Usuario`.                                            |
| `criadoEm`  | DateTime  | Definido automaticamente na criação.                                          |

**Regra de cálculo do `estado`** (aplicada em toda resposta que envolve tarefas):
- Se `concluida === true` → `"concluida"`
- Senão, se `prazo` existe e já passou → `"atrasada"`
- Caso contrário → `"em-andamento"`

---

## Códigos de Erro

Todas as respostas de erro seguem o formato:

```json
{
  "mensagem": "Descrição do erro"
}
```

| Código | Significado            | Quando ocorre                                                                 |
|--------|------------------------|---------------------------------------------------------------------------------|
| 400    | Bad Request            | Campos obrigatórios faltando, dados inválidos (ex.: data de nascimento, estado de filtro), CPF/email já em uso. |
| 401    | Unauthorized           | Token ausente/inválido/expirado, credenciais de login incorretas, senha incorreta em operações sensíveis. |
| 404    | Not Found              | Usuário ou tarefa não encontrados, ou tarefa pertencente a outro usuário.       |
| 500    | Internal Server Error  | Falha inesperada (ex.: erro de banco de dados).                                  |