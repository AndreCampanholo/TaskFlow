# TaskFlow

Aplicativo de gerenciamento de tarefas desenvolvido como projeto trainee da **ICMC Jr**.

## Stack

| Camada       | Tecnologias                          |
| ------------ | ------------------------------------ |
| **Frontend** | React Native, Expo, TypeScript       |
| **Backend**  | Node.js, Express, Prisma ORM, SQLite |

## Estrutura do projeto

```
TaskFlow/
├── frontend/          # aplicativo (Expo / React Native)
│   ├── src/
│   │   ├── app/           # telas e rotas
│   │   ├── components/    # componentes reutilizáveis
│   │   ├── hooks/         # custom hooks
│   │   ├── services/      # chamadas à API
│   │   ├── styles/        # estilos
│   │   ├── types/         # tipagens TypeScript
│   │   └── utils/         # funções utilitárias
│   ├── assets/
│   ├── app.json
│   └── docs/             # documentação do front
│
├── backend/           # API REST (Node / Express / Prisma)
│   ├── src/
│   ├── prisma/          # schema e migrations
│   ├── server.js        # ponto de entrada
│   └── docs/            # documentação do back (database, errors, install, routes)
│
├── docs/              # documentação geral do projeto
│   ├── arquitetura.md   # visão de alto nível e diagrama de componentes
│   ├── api.md           # especificação dos endpoints
│   ├── handbook.md      # padrões de código e convenções
│   └── changelog.md     # histórico de versões
│
└── README.md
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- npm
- [Expo Go](https://expo.dev/go) instalado no celular (para testar o app)

## Como rodar

Clone o repositório e instale as dependências de cada parte separadamente.

```bash
git clone https://github.com/AndreCampanholo/TaskFlow.git
cd TaskFlow
```

### Backend

```bash
cd backend
npm install

# copie o arquivo de exemplo de variáveis de ambiente e ajuste os valores
cp .env.example .env

# aplique as migrations e gere o client do Prisma
npx prisma migrate dev

# inicia a API
npm start
```

A API sobe por padrão em `http://localhost:3000` (confira a porta no `.env`).

### Frontend

```bash
cd frontend
npm install

# inicia o Expo
npx expo start
```

Escaneie o QR Code com o app **Expo Go** para abrir no celular.

> **Importante:** o app precisa conseguir alcançar a API. Em `frontend/src/services/`, ajuste a URL base para o IP da máquina onde o backend está rodando (ex.: `http://192.168.0.10:3000`), não `localhost` — o celular não enxerga o `localhost` do seu computador.

## Documentação

- Visão geral de arquitetura: [`docs/arquitetura.md`](docs/arquitetura.md)
- Endpoints da API: [`docs/api.md`](docs/api.md) e [`backend/docs/routes.md`](backend/docs/routes.md)
- Padrões de código: [`docs/handbook.md`](docs/handbook.md)
- Instalação detalhada do backend: [`backend/docs/install.md`](backend/docs/install.md)

<!-- ## Contribuindo

1. Crie uma branch a partir da `main` (`git checkout -b minha-feature`)
2. Faça seus commits seguindo as convenções do [`docs/handbook.md`](docs/handbook.md)
3. Abra um Pull Request para a `main`

## Equipe

Projeto trainee da ICMC Jr.

Preencha com os integrantes e contatos da equipe -->
