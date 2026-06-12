# Deployment — Backend TaskFlow

Guia para subir a API em produção. A stack é **Node.js + Express + Prisma + SQLite**, então há um cuidado específico com a persistência do banco (ver seção [Atenção: SQLite em produção](#atenção-sqlite-em-produção)).

## Pré-requisitos

- Conta no provedor de hospedagem (Railway, Render ou Docker em servidor próprio).
- Repositório no GitHub com o backend (no monorepo, o backend fica em `backend/`).
- As **migrations do Prisma commitadas** no repositório (`backend/prisma/migrations/`). Elas são o que recria o banco no servidor.

## Variáveis de ambiente

A API depende das variáveis abaixo (ver `.env.example`). No provedor, cadastre-as no painel de *environment variables* — **nunca** commite o `.env` real.

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `DATABASE_URL` | Caminho do arquivo SQLite (formato `file:`). Em produção, deve apontar para um volume persistente. | `file:/data/prod.db` |
| `JWT_SECRET` | Chave usada para assinar os tokens JWT. Gere uma string longa e aleatória. | `8f3a...` (32+ caracteres) |
| `PORT` | Porta em que o Express escuta. Muitos provedores injetam essa variável automaticamente. | `3000` |

> Gere um `JWT_SECRET` seguro com:
> ```bash
> node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
> ```

## Comandos de build e start

| Etapa | Comando | O que faz |
| --- | --- | --- |
| Instalação | `npm install` | Instala dependências. O script `postinstall` já roda `prisma generate` automaticamente. |
| Migração | `npx prisma migrate deploy` | Aplica as migrations existentes no banco de produção (sem prompts interativos — diferente do `migrate dev`). |
| Start | `npm start` | Sobe a API (`node server.js`). |

A ordem importa: **instalar → migrar → iniciar**. A migração precisa rodar antes do start para que o banco exista com as tabelas certas.

## Atenção: SQLite em produção

O SQLite guarda **tudo em um único arquivo** (`dev.db`). Em plataformas como Railway e Render, o sistema de arquivos é **efêmero**: a cada novo deploy ou reinício do serviço, o disco é zerado — e com ele **todos os dados cadastrados some**.

Há duas formas de resolver:

1. **Volume persistente (recomendado para este projeto).** Cria-se um disco que sobrevive aos deploys e aponta-se o `DATABASE_URL` para um caminho dentro dele (ex.: `file:/data/prod.db`). Mantém o SQLite e exige zero mudança de código.
2. **Migrar para PostgreSQL.** Para um ambiente de produção "de verdade", troca-se o `provider` do datasource de `sqlite` para `postgresql` no `schema.prisma` e usa-se um banco gerenciado (Railway e Render oferecem Postgres gratuito). Mais robusto, porém exige refazer as migrations.

Para a entrega do projeto trainee, a **opção 1** é suficiente e mais simples. Os passos abaixo já a incluem.

## Deploy no Railway (recomendado)

1. Acesse [railway.app](https://railway.app) e crie um projeto: **New Project → Deploy from GitHub repo**.
2. Selecione o repositório. Como é um monorepo, em **Settings → Root Directory** defina `backend`.
3. Em **Variables**, cadastre `JWT_SECRET` e `DATABASE_URL`. O Railway injeta `PORT` automaticamente.
4. **Crie um volume** para persistir o banco: na aba do serviço, **New → Volume**, e monte em `/data`. Depois ajuste a variável:
   ```
   DATABASE_URL=file:/data/prod.db
   ```
5. Em **Settings → Deploy**, defina o *Custom Start Command* para garantir que as migrations rodem antes da API subir:
   ```
   npx prisma migrate deploy && npm start
   ```
6. Faça o deploy. Ao final, o Railway gera uma URL pública (ex.: `https://taskflow-api.up.railway.app`) — é ela que o frontend deve consumir.

## Deploy no Render (alternativa)

1. Em [render.com](https://render.com), crie um **New → Web Service** conectado ao repositório.
2. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma migrate deploy`
   - **Start Command:** `npm start`
3. Em **Environment**, adicione `JWT_SECRET` e `DATABASE_URL`.
4. Para persistir o SQLite, adicione um **Disk** (em Settings → Disks), monte em `/data` e use `DATABASE_URL=file:/data/prod.db`.
   > No plano gratuito do Render o disco persistente não está disponível — nesse caso, use Railway ou migre para PostgreSQL.

## Deploy com Docker (servidor próprio)

Para subir em qualquer servidor com Docker, crie um `Dockerfile` na raiz do `backend/`:

```dockerfile
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
```

Build e execução, montando um volume para persistir o banco:

```bash
docker build -t taskflow-api .

docker run -d \
  -p 3000:3000 \
  -e JWT_SECRET="sua-chave-secreta" \
  -e DATABASE_URL="file:/data/prod.db" \
  -v taskflow-data:/data \
  --name taskflow-api \
  taskflow-api
```

O `-v taskflow-data:/data` cria um volume Docker nomeado que mantém o `prod.db` entre reinícios do container.

## Checklist pós-deploy

- [ ] A URL pública responde (ex.: `GET /` ou uma rota de health check).
- [ ] As migrations foram aplicadas (cadastro e login funcionando ponta a ponta).
- [ ] O `DATABASE_URL` aponta para o volume persistente, não para um caminho efêmero.
- [ ] O `JWT_SECRET` de produção é diferente do usado em desenvolvimento.
- [ ] O `frontend/src/services/` foi atualizado para a URL pública da API.
- [ ] O CORS no backend permite a origem do app (ver configuração do `cors` no `server.js`).
