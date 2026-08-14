# ⚡ Webhook Payment Front

[![CI/CD & Deploy](https://github.com/JhonatanRian/webhook-payment-front/actions/workflows/deploy.yml/badge.svg)](https://github.com/JhonatanRian/webhook-payment-front/actions/workflows/deploy.yml)
[![codecov](https://codecov.io/gh/JhonatanRian/webhook-payment-front/branch/main/graph/badge.svg)](https://codecov.io/gh/JhonatanRian/webhook-payment-front)
[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v3-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com)
[![Vitest](https://img.shields.io/badge/Vitest-Coverage_81%25-6E9F18.svg?logo=vitest)](https://vitest.dev)
[![Docker](https://img.shields.io/badge/Docker-Multi--Stage-2496ED.svg?logo=docker)](https://docker.com)

Dashboard operacional e financeiro de alta densidade visual (estilo **Zoho**) para orquestração e monitoramento em tempo real de **emissão de cobranças Pix**, **validação de webhooks criptográficos com chave ECDSA** e **liquidações automáticas** integradas à Stark Bank SDK.

---

## 🏛️ Identidade Visual & Design System (Estilo Zoho)

- **Superfícies Limpas e Compactas**: Alta densidade de dados com fontes e espaçamentos otimizados (`py-2 px-3`, fonte base `13px`).
- **Suporte Nativo a Dark Mode**: Alternância suave Claro/Escuro persistida em `localStorage`.
- **Gaveta Lateral Deslizante (Slide-over Drawer)**: Inspeção instantânea de metadados, payload JSON bruto e cópia de chaves com 1 clique.
- **Temporizador Pulsante em Tempo Real**: Atualização automática a cada 60s com sincronização sob demanda.
- **Exportação Imediata**: Download de relatórios filtrados em formato **CSV (com BOM UTF-8)** e **JSON**.

---

## 🛠️ Stack Tecnológica

* **Core & Build**: React 19, TypeScript 5, Vite 6, pnpm.
* **Estilização**: Tailwind CSS v3 com tokens de cor semânticos e densidade Zoho.
* **Roteamento**: React Router DOM v7 (rotas estruturadas `/dashboard`, `/invoices`, `/transfers`, `/scheduler`).
* **Gerenciamento de Estado & Polling**: TanStack Query v5 (React Query) com polling inteligente de 60 segundos.
* **Cliente HTTP**: Axios com rastreabilidade `X-Request-Id` e tratamento RFC 7807 Problem Details.
* **Notificações**: Sonner (toasts flutuantes de alta densidade).
* **Testes & Cobertura**: Vitest + React Testing Library + jsdom + `@vitest/coverage-v8`.
* **Deploy & Container**: Docker Multi-stage + Nginx Alpine (~25 MB) + GitHub Actions + Portainer.

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório e instalar dependências:
```bash
git clone git@github.com:JhonatanRian/webhook-payment-front.git
cd webhook-payment-front
pnpm install
```

### 2. Configurar variáveis de ambiente:
```bash
cp .env.example .env
```

### 3. Iniciar o servidor de desenvolvimento:
```bash
pnpm dev
```
Acesse `http://localhost:5173`.

---

## 🧪 Testes Automatizados & Cobertura

O projeto conta com **114 testes automatizados** abrangendo utilitários, hooks TanStack Query, componentes do Design System e páginas de domínio.

```bash
# Executar todos os testes
pnpm test:run

# Executar testes com relatório detalhado de cobertura de código
pnpm test:coverage

# Modo interativo (watch)
pnpm test:watch

# Linter ultra rápido (Oxlint)
pnpm lint
```

---

## 🐳 Executando com Docker

### Build local da imagem:
```bash
docker build -t webhook-payment-front:latest --build-arg VITE_API_BASE_URL=/api/v1 .
```

### Executar o container:
```bash
docker run -d -p 80:80 --name webhook-front webhook-payment-front:latest
```

---

## 🔄 Pipeline de CI/CD

O workflow no GitHub Actions (`.github/workflows/deploy.yml`) executa automaticamente:
1. **Quality & Tests**: Linter (`oxlint`), Typecheck (`tsc`), Testes com Coverage (`vitest`) e upload para o **Codecov**.
2. **Build & Deploy**: Empacotamento da imagem Docker multi-stage, push para o **GitHub Container Registry (GHCR)** e acionamento do webhook do **Portainer**.

---

## 📜 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para obter mais detalhes.
