# Handbook

Este documento reúne as convenções de código e padrões observados no projeto **TaskFlow** (front-end em React Native/Expo e back-end em Node/Express).

## 1. Naming (Nomenclatura)

### Arquivos

- **Componentes React Native**: `PascalCase.tsx`, igual ao nome do componente exportado por padrão (ex.: `BotaoAzulEscuro.tsx`, `Cadastro.tsx`).
- **Arquivos de estilo/configuração**: `lowercase.ts` (ex.: `global.ts`).
- **Diretórios**: lowercase (`components/`, `styles/`, `services/`, `hooks/`).

### Componentes React

- `PascalCase` (ex.: `BotaoAzulEscuro`, `BarraFiltro`, `BarraStatusTarefa`, `Cadastro`).

### Variáveis e funções

- `camelCase`, com nomes em português (ex.: `dataNascimento`, `exibirAlerta`, `handleCadastro`, `seletorDataAberto`).
- Funções de manipulação de evento seguem o prefixo `handle` (ex.: `handleCadastro`, `handleDateChange`), seguindo a convenção comum do React.

### Tipos (TypeScript)

- `PascalCase` para `type` e tipos exportados (ex.: `FiltroTarefa`, `EstadoTarefa`).
- Valores de enum/union em `kebab-case` quando representam estados de domínio (ex.: `"em-andamento"`, `"concluida"`, `"atrasada"`).

### Estilos (`StyleSheet.create`)

- Chaves dos estilos em `camelCase` (ex.: `primaryButton`, `headerText`, `sectionTitle`).
- Cores no objeto `colors` usam `snake_case` (ex.: `azul_escuro`, `azul_claro`).

---

## 2. Estilização

- A estilização é feita com `StyleSheet.create` do React Native (CSS-in-JS nativo).
- Existe um arquivo central de estilos globais: `src/styles/global.ts`, que exporta:
  - `colors`: paleta de cores do app (ex.: `azul_escuro: "#1E3A8A"`, `verde: "#10B981"`, `vermelho: "#BA1A1A"`).
  - `globalStyles`: estilos reutilizáveis (botões, textos de seção, inputs, cards, pills, etc.).
- **Padrão de uso**: componentes importam `colors` e/ou `globalStyles` de `@/src/styles/global` e:
  - Reutilizam estilos diretamente (ex.: `style={globalStyles.primaryButtonText}`).
  - Estendem estilos globais via spread em estilos locais:
    ```ts
    const styles = StyleSheet.create({
      buttonStyle: {
        ...globalStyles.primaryButton,
        width: "100%",
        marginTop: 24,
      },
    });
    ```
- Cores específicas de estado (ex.: status de tarefa) são derivadas da paleta `colors` em vez de valores hexadecimais soltos, exceto quando se trata de variações de opacidade (`rgba(...)`) usadas apenas localmente.
- Para inputs em plataforma web (`Platform.OS === "web"`), é aceitável usar estilo inline em objeto JS (ex.: o `<input type="date">` em `Cadastro.tsx`), já que componentes nativos do React Native (`TextInput`) não cobrem todos os elementos HTML.

---

## 3. Boas práticas

- **DRY**: lógica e estilos repetidos devem ser extraídos para `globalStyles` (estilos) ou para componentes reutilizáveis em `src/components/` (ex.: `BotaoAzulEscuro`).
- **Comentários**: cada componente e função com lógica não trivial deve conter um comentário curto, em português, explicando seu propósito (ex.: _"Cria um componente de um botão azul escuro (usado múltiplas vezes no app)"_). Não é exigido o uso formal de JSDoc/TSDoc, mas comentários descritivos acima de funções e componentes são esperados.
- **Tratamento de erros no front-end**: chamadas à API devem ser envolvidas em `try/catch`, exibindo mensagens de erro ao usuário via `Alert`/`window.alert` (função utilitária `exibirAlerta`), nunca falhando silenciosamente.
- **Validações no front-end**: validações de formulário (campos obrigatórios, formato de e-mail, CPF, confirmação de senha, datas) devem ocorrer **antes** de chamar a API, para reduzir round-trips e melhorar a experiência do usuário — sem substituir as validações já existentes no back-end.
- **Tipagem**: usar tipos explícitos para `props` de componentes (`type Props = {...}`) e para domínios compartilhados (ex.: `EstadoTarefa`, `FiltroTarefa`), evitando `any` sempre que possível.
- **Compatibilidade web/mobile**: quando um componente precisa de comportamento diferente em web e nativo, usar `Platform.OS` para diferenciar (ex.: `DateTimePicker` no nativo vs. `<input type="date">` na web).

---

## 4. Ferramentas

### ESLint

- Configuração baseada no preset oficial do Expo: `eslint-config-expo/flat`, usando o novo formato _flat config_ (`eslint.config.js`).

### Prettier e Commitlint

- Ainda não há arquivos de configuração de Prettier (`.prettierrc`) ou Commitlint (`commitlint.config.js`) no projeto.

### Back-end

- Formatação de JSON: indentação de 2 espaços (conforme `errors.md` / respostas da API).
