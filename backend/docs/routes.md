# TaskFlow
Documentação das Rotas

## Listagem de Rotas
### Autenticação (`/auth`)
Rotas responsáveis pelo cadastro, autenticação e gerenciamento da conta do usuário.
| Método | Rota | Descrição |
|---------|-------|------------|
| POST | `/auth/cadastro` | Realiza o cadastro de um novo usuário. |
| POST | `/auth/login` | Realiza a autenticação do usuário e retorna um token JWT. |
| GET | `/auth/perfil` | Retorna os dados do usuário autenticado. |
| PATCH | `/auth/perfil` | Atualiza as informações do perfil do usuário. |
| PATCH | `/auth/senha` | Permite a alteração da senha do usuário. |
| DELETE | `/auth/conta` | Remove permanentemente a conta do usuário. |

### Tarefas (`/tarefas`)
Rotas responsáveis pelo gerenciamento das tarefas do usuário autenticado.
| Método | Rota | Descrição |
|---------|-------|------------|
| GET | `/tarefas` | Retorna a lista de tarefas do usuário. |
| POST | `/tarefas` | Cria uma nova tarefa. |
| PATCH | `/tarefas/:id` | Atualiza uma tarefa existente. |
| DELETE | `/tarefas/:id` | Remove uma tarefa do sistema. |

## Middlewares aplicados
### `auth.middleware`
Middleware responsável pela autenticação dos usuários por meio de tokens JWT.
Funções desempenhadas:
- Verifica a presença do token de autenticação na requisição;
- Valida o token utilizando a variável de ambiente `JWT_SECRET`;
- Identifica o usuário autenticado;
- Disponibiliza o identificador do usuário em `req.usuarioId`;
- Impede o acesso às rotas protegidas quando o token é inválido ou inexistente.

### Rotas protegidas
As seguintes rotas utilizam o middleware de autenticação:
- `GET /auth/perfil`
- `PATCH /auth/perfil`
- `PATCH /auth/senha`
- `DELETE /auth/conta`
- Todas as rotas do módulo `/tarefas`