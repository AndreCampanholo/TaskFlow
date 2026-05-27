
## 2. `structure.md`


# Estrutura do Front-end

## `src/app`
Contém as rotas e telas principais do aplicativo.

### Arquivos principais
- `_layout.tsx`: layout raiz da aplicação. Define a estrutura geral de navegação e configurações globais das rotas.
- `index.tsx`: tela inicial da aplicação ou ponto de redirecionamento para o fluxo correto, como login ou área principal.

### `(auth)`
Telas relacionadas à autenticação:
- `Login.tsx`: tela de login com e-mail ou CPF.
- `Cadastro.tsx`: criação de novo usuário.
- `RecuperarSenha.tsx`: recuperação de senha.

### `(tabs)/tarefas`
Fluxo principal de tarefas:
- `Tasks.tsx`: listagem de tarefas.
- `TarefaDetalhes.tsx`: detalhes da tarefa.
- `TarefaEditar.tsx`: edição de tarefa.
- `_layout.tsx`: configuração de navegação da área de tarefas.

### `(tabs)/perfil`
Fluxo de conta do usuário:
- `Perfil.tsx`: informações da conta.
- `EditarPerfil.tsx`: alteração dos dados do usuário.
- `AlterarSenha.tsx`: troca de senha.
- `ExcluirConta.tsx`: exclusão da conta.

## `src/components`
Componentes reutilizáveis da interface:
- `TaskCard.tsx`: card de tarefa.
- `TaskStatusBar.tsx`: barra de status/filtro das tarefas.
- `NovaTaskCard.tsx`: card para criação de nova tarefa.
- `BotaoAzulEscuro.tsx`, `BotaoVermelho.tsx`, etc.: botões padronizados.

## `src/hooks`
Hooks customizados que encapsulam lógica de negócio e estado global:
- `useTarefas.ts`: armazena a lista de tarefas em memória, expõe funções de criação, edição, exclusão e alternância de estado, e recalcula automaticamente o status (`em-andamento`, `concluida`, `atrasada`) com base na data de vencimento.

## `src/utils`
Contém funções utilitárias reutilizáveis:
- `TaskDates.ts`: manipulação de datas e prazos.

## `src/styles`
Estilos globais e tokens visuais:
- `global.ts`: tokens de cor, espaçamento ou estilos compartilhados.

## `src/types`
Tipos globais TypeScript.