# TaskFlow
Documentação de Erros

## Formato padrão de resposta
As respostas de erro da API seguem o formato JSON abaixo:
```json
{
  "mensagem": "Descrição do erro"
}
```

## Erros comuns
### 400 - Bad Request
Indica que a requisição enviada pelo cliente é inválida ou não contém todas as informações necessárias.

Exemplos:
* Campos obrigatórios não preenchidos durante o cadastro;
* Tentativa de criar uma tarefa sem informar o título;
* Alteração de perfil sem fornecer nenhum dado para atualização.

Resposta:
```json
{
  "mensagem": "Todos os campos são obrigatórios"
}
```

### 401 - Unauthorized
Indica falha no processo de autenticação ou credenciais inválidas.

Exemplos:
* Token JWT inválido ou expirado;
* Senha incorreta;
* Tentativa de login com identificador ou senha inválidos.

Resposta:
```json
{
  "mensagem": "Token inválido"
}
```

### 404 - Not Found
Indica que o recurso solicitado não foi encontrado.

Exemplos:
* Usuário inexistente;
* Tentativa de atualizar ou excluir uma tarefa inexistente;
* Tentativa de acessar uma tarefa pertencente a outro usuário.

Resposta:
```json
{
  "mensagem": "Tarefa não encontrada"
}
```

### 500 - Internal Server Error
Indica que ocorreu uma falha inesperada durante o processamento da requisição.

Exemplos:
* Erros de comunicação com o banco de dados;
* Exceções não tratadas na aplicação.

Resposta:
```json
{
  "mensagem": "Erro ao criar tarefa"
}
```
