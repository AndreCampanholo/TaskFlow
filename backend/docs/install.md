# TaskFlow
Guia de instalação do Back-end

## Pré-requisitos 
Antes de começar, você precisa ter instalado: 
- Node.js (versão 18 ou superior)
- Git

## Clonar o repositório 
No terminal, execute os comandos:
```bash
git clone https://github.com/AndreCampanholo/TaskFlow.git
cd backend
```

## Configurar variáveis de ambiente 
Execute o comando abaixo para criar o arquivo `.env`:
```bash
cp .env.example .env
```

## Instalar dependências 
Dentro da pasta do projeto, execute:
```bash
npm install
```

## Configurar o banco de dados 
Para criar o banco de dados local, execute: 
```bash
npx prisma migrate dev
```
* Para apagar/limpar o banco de dados:  
`npx prisma migrate reset`

* Para visualizar graficamente o banco de dados:  
`npx prisma studio`

## Rodar o projeto 
Para iniciar o servidor em modo de desenvolvimento, execute:
```bash
npm run dev
```
