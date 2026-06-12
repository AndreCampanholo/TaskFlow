# TaskFlow
Documentação do Banco de Dados

## Tecnologia utilizada
O backend utiliza o ORM Prisma para acesso ao banco de dados SQLite. Os modelos definidos no arquivo `schema.prisma` representam as entidades persistidas pela aplicação.

## Modelos
### Usuario 
Campos do modelo `Usuario`:  
* `id`: identificador único do usuário.
* `nome`: nome completo do usuário.
* `cpf`: CPF do usuário (único).
* `email`: endereço de e-mail do usuário (único).
* `dataNascimento`: data de nascimento.
* `senha`: senha criptografada do usuário.
* `criadoEm`: data de criação do registro.
* `tarefas`: relação com as tarefas pertencentes ao usuário.

Exemplo de documento:
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "cpf": "12345678901",
  "email": "maria@email.com",
  "dataNascimento": "1999-05-10T00:00:00.000Z",
  "senha": "$2b$10$...",
  "criadoEm": "2026-06-12T10:00:00.000Z"
}
```
### Tarefa
Campos do modelo `Tarefa`:
* `id`: identificador único da tarefa.
* `titulo`: título da tarefa.
* `descricao`: descrição complementar da tarefa (opcional).
* `concluida`: indica se a tarefa foi concluída.
* `estado`: estado atual da tarefa (`em-andamento`, `concluida` ou `atrasada`).
* `prazo`: data e horário limite para realização da tarefa (opcional).
* `usuarioId`: identificador do usuário responsável pela tarefa.
* `criadoEm`: data de criação do registro.
* `usuario`: relação com o usuário proprietário da tarefa.

Exemplo de documento:
```json
{
  "id": 1,
  "titulo": "Finalizar documentação",
  "descricao": "Escrever os arquivos de documentação do backend",
  "concluida": false,
  "estado": "em-andamento",
  "prazo": "2026-06-20T18:00:00.000Z",
  "usuarioId": 1,
  "criadoEm": "2026-06-12T14:30:00.000Z"
}
```
## Índices
### Modelo Usuario
* `id`: chave primária (`@id`).
* `cpf`: índice único (`@unique`), impedindo o cadastro de usuários com o mesmo CPF.
* `email`: índice único (`@unique`), impedindo o cadastro de usuários com o mesmo endereço de e-mail.

### Modelo Tarefa
* `id`: chave primária (`@id`).

## Relações
O banco de dados possui uma relação do tipo **um para muitos (1:N)** entre os modelos `Usuario` e `Tarefa`.  
* Um **usuário** pode possuir **várias tarefas**.
* Cada **tarefa** pertence a apenas **um único usuário**.  

Isso é garantido no código pelo campo usuarioId que faz referência a Usuario.id.
