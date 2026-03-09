# Alfred SDR Conectivida — Execução Local

Este repositório foi preparado para rodar localmente com:
- **Backend** em Express na porta **3001**
- **Frontend** estático na porta **3000**

## 1) Instalar dependências do backend

```bash
cd backend
npm install
```

## 2) Garantir que o servidor Express rode na porta 3001

O backend está configurado fixamente na porta `3001` no arquivo `backend/src/server.js`.

Para iniciar apenas o backend:

```bash
npm --prefix backend run start
```

Verificação rápida:

```bash
curl http://localhost:3001/health
```

## 3) Script de inicialização

Foi adicionado o script:

```bash
./scripts/start-local.sh
```

Esse script:
- instala dependências do backend (se necessário)
- inicia backend em `http://localhost:3001`
- inicia frontend em `http://localhost:3000`

## 4) Abrir frontend no navegador

Com os serviços rodando, abra:

- `http://localhost:3000`

A página faz uma chamada para `http://localhost:3001/api/message` para validar a comunicação com o backend.

## 5) Como executar o projeto no computador (passo a passo)

```bash
git clone <url-do-repo>
cd SDR-Alfred---Conectivida
./scripts/start-local.sh
```

Depois, abra no navegador:

- `http://localhost:3000`
