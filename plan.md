# 🎨 Plano Arquitetural: Frontend Dashboard em React (Estilo Zoho)

Este documento é o **guia técnico consolidado e definitivo** para o desenvolvimento do frontend da aplicação em **React + TypeScript + Vite + Tailwind CSS v3**, com visual elegante, compacto e ultra intuitivo inspirado na suíte **Zoho (Zoho Cliq, Zoho Mail, Zoho Books)**.

---

## 🏛️ 1. Identidade Visual & Design System (Estilo Zoho)

Os produtos Zoho destacam-se por:
- **Superfícies limpas e compactas**: sem bordas pesadas ou sombras exageradas.
- **Alta densidade de informação**: tabelas compactas com fonte base de `13px`, metadados em `11px/12px`, espaçamento eficiente (`py-2 px-3`).
- **Suporte a Tema Claro / Escuro (Dark Mode)**: alternável via toggle no topo e persistido em `localStorage` (com suporte a tokens semânticos de cor).
- **Paleta de cores sóbria**:
  - **Fundo geral (Light):** `#F8FAFC` (Slate 50) | **Fundo (Dark):** `#0F172A` (Slate 900)
  - **Cards & Tabelas (Light):** `#FFFFFF` com bordas sutis `1px solid #E2E8F0` | **Dark:** `#1E293B` borda `#334155`
  - **Azul Zoho (Destaques & Ações):** `#0067FF` (Hover: `#0053CC`, Soft: `#EBF3FF`)
  - **Verde (Creditado / Sucesso):** `#0D9488` / `#10B981` (Tag soft: `#ECFDF5` com texto `#065F46`)
  - **Amarelo (Processando / Pendente):** `#F59E0B` (Tag soft: `#FFFBEB` com texto `#92400E`)
  - **Vermelho (Falhas / Erros):** `#EF4444` (Tag soft: `#FEF2F2` com texto `#991B1B`)
- **Layout Zoho em 3 Áreas**:
  1. **Sidebar Lateral Esquerda (Compacta)**: Ícones finos (Lucide React) com tooltip e links de rota com indicador ativo.
  2. **Topbar Superior**: Barra de status do Agendador 24h, badge de status de saúde (`/health`), botão de disparo manual, alternador de tema Claro/Escuro e **indicador pulsante de atualização minuto a minuto (60s)**.
  3. **Painel de Trabalho Central**: Rotas organizadas por URLs (`/dashboard`, `/invoices`, `/transfers`, `/scheduler`), gaveta/drawer lateral para detalhamento e ações rápidas (exportação CSV/JSON).

---

## 🛠️ 2. Stack Tecnológica & Dependências

- **Runtime & Build**: Node.js 22 LTS, Vite 6, TypeScript 5.
- **Gerenciador de Pacotes**: `pnpm` (modo frozen lockfile no CI/CD).
- **Estilização**: **Tailwind CSS v3** com plugins `@tailwindcss/forms` e `@tailwindcss/typography`, configurado com tokens Zoho.
- **Roteamento**: **React Router DOM v6** (com sincronização de busca/filtros na URL via SearchParams).
- **Gerenciamento de Estado de Servidor & Polling**: **TanStack Query v5** (React Query com polling de 60s).
- **Cliente HTTP**: **Axios** (RFC 7807, injeção de `X-Request-Id` e timeout resiliente).
- **Notificações (Toasts)**: **Sonner** (toasts flutuantes de alta densidade).
- **Primitivas de Acessibilidade & UI**: **Radix UI** (`@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tooltip`, `@radix-ui/react-tabs`).
- **Mocks para Desenvolvimento**: Suporte a Mock Service Worker (MSW) / Interceptor de Mock toggleável via variável de ambiente.

---

## 🏗️ 3. Estrutura Modular do Projeto (Feature-Sliced Clean Architecture)

```text
webhook-payment-front/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js          # Configuração dos tokens de cor e densidade Zoho
├── postcss.config.js
├── Dockerfile                  # Multi-stage com build-args e Nginx Alpine (~25 MB)
├── .dockerignore
├── nginx.conf                  # Proxy reverso /api/ -> backend e SPA fallback
├── .env.example                # Exemplo das variáveis de ambiente
├── .env.development            # Variáveis para desenvolvimento local
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD com GitHub Secrets (VITE_API_BASE_URL)
└── src/
    ├── app/
    │   ├── App.tsx             # Root component com BrowserRouter e Rotas
    │   └── providers.tsx       # QueryClientProvider (60s), ThemeProvider, Toaster (Sonner)
    ├── assets/                 # SVGs, logotipos e ícones
    ├── components/             # Componentes UI reutilizáveis (Design System Zoho)
    │   ├── ui/
    │   │   ├── Badge.tsx       # Status pills compactas (Created, Credited, Success, etc.)
    │   │   ├── Button.tsx      # Botões de alta densidade com spinner de loading
    │   │   ├── Card.tsx        # Contêineres de superfícies brancas com borda suave
    │   │   ├── DataTable.tsx   # Tabela paginada, ordenável e com skeleton loading
    │   │   ├── Drawer.tsx      # Drawer/Gaveta lateral deslizante (estilo Zoho)
    │   │   ├── Modal.tsx       # Modais elegantes com Backdrop blur leve
    │   │   ├── Pagination.tsx  # Barra de paginação (Página X de Y, Anterior, Próxima, Tamanho)
    │   │   ├── PulseTimer.tsx  # Indicador visual e regressivo de polling (60s)
    │   │   └── ThemeToggle.tsx # Botão de alternância Light/Dark mode
    │   └── layout/
    │       ├── Header.tsx      # Topbar com status da API, scheduler, tema e pulse
    │       ├── Sidebar.tsx     # Barra de navegação lateral estilo Zoho
    │       └── Shell.tsx       # Wrapper responsivo principal
    ├── features/               # Módulos de Domínio da Aplicação
    │   ├── invoices/           # Módulo de Faturas e Lotes Pix
    │   │   ├── api.ts          # Hooks TanStack Query (useInvoices, useInvoiceBatches, useIssueBatch)
    │   │   ├── components/     # InvoiceBatchList, InvoiceTable, InvoiceDetailDrawer, IssueBatchModal
    │   │   └── types.ts        # Interfaces TypeScript (Invoice, InvoiceBatch)
    │   ├── transfers/          # Módulo de Transferências de Liquidação
    │   │   ├── api.ts          # Hooks TanStack Query (useTransfers)
    │   │   ├── components/     # TransferTable, TransferDetailDrawer
    │   │   └── types.ts        # Interfaces TypeScript (TransferRecord)
    │   ├── scheduler/          # Módulo de Controle dos Ciclos de 24 Horas
    │   │   ├── api.ts          # Hooks (useSchedulerStatus, useTriggerCycle, useChangeMode, useResetCycles)
    │   │   ├── components/     # CycleProgressRing, NextRunCountdown, ModeSwitch, ResetDialog
    │   │   └── types.ts        # Interfaces TypeScript (SchedulerStatus)
    │   └── dashboard/          # Visão Geral & Métricas Consolidadas
    │       ├── components/     # StatsOverview, RecentActivityFeed, MoneyFlowCard
    │       └── types.ts
    ├── mocks/                  # Mocks opcionais para desenvolvimento autônomo
    │   ├── data.ts             # Dados fictícios representativos para faturas/transferências/scheduler
    │   └── handlers.ts         # Handlers para emulação de API
    ├── services/
    │   └── api.ts              # Cliente Axios inteligente com interceptors e RFC 7807
    └── utils/
        ├── currency.ts         # Formatador de centavos para Real: 15000 -> "R$ 150,00"
        ├── date.ts             # Formatador de timestamp ISO para formato local brasileiro
        ├── export.ts           # Utilitários de exportação de dados para CSV e JSON
        └── mask.ts             # Máscara para CPF/CNPJ (ex: 123.***.***-00)
```

---

## ⚙️ 4. Configuração de Variáveis de Ambiente (`.env`)

No Vite, as variáveis expostas ao client-side iniciam obrigatoriamente com o prefixo `VITE_`.

### Arquivo `.env.example`
```bash
# URL base da API REST (em dev pode apontar para o proxy do Vite ou URL direta)
VITE_API_BASE_URL=/api/v1

# Ativar mock de dados caso a API local não esteja disponível (true | false)
VITE_ENABLE_MOCKS=false

# Intervalo padrão de atualização do Polling em milissegundos (padrão: 60000ms = 60s)
VITE_POLLING_INTERVAL_MS=60000
```

### Arquivo `.env.development` (Exemplo para desenvolvimento local)
```bash
# Exemplo 1: Utilizando o proxy reverso do Vite (/api/v1 -> http://localhost:8000/api/v1)
VITE_API_BASE_URL=/api/v1
VITE_ENABLE_MOCKS=false

# Exemplo 2: Apontando diretamente para uma API local ou remota de desenvolvimento
# VITE_API_BASE_URL=http://localhost:8000/api/v1

# Exemplo 3: Trabalhando 100% offline com dados mockados
# VITE_ENABLE_MOCKS=true
```

---

## ⚡ 5. Cliente Axios Inteligente & Atualização em Tempo Real (60s)

### Cliente Axios (`src/services/api.ts`)
```typescript
import axios, { AxiosError } from "axios";

export interface ApiErrorResponse {
  error?: string;
  code?: string;
  detail?: string;
  request_id?: string;
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor para injeção de correlation ID e rastreabilidade
apiClient.interceptors.request.use((config) => {
  config.headers["X-Request-Id"] = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return config;
});

// Interceptor com tratamento transparente de erros RFC 7807
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const errorDetail =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      "Ocorreu um erro inesperado na comunicação com a API.";
    
    console.error(`[API Error ${error.response?.status}]:`, errorDetail);
    return Promise.reject(new Error(errorDetail));
  }
);
```

### ⏱️ Polling Automático e Provedores (`src/app/providers.tsx`)
```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const POLLING_INTERVAL = Number(import.meta.env.VITE_POLLING_INTERVAL_MS) || 60_000;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: POLLING_INTERVAL, // Refetch automático a cada 60 segundos
      refetchIntervalInBackground: false,
      staleTime: 30_000,                 // Considera dados frescos por 30s
      refetchOnWindowFocus: true,        // Atualiza ao focar na aba
      retry: 2,
    },
  },
});

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
```

---

## 📋 6. Catálogo de Endpoints, Parâmetros & Tipos TypeScript

### Resposta Genérica de Paginação
```typescript
export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}
```

### 1. Faturas (`/api/v1/invoices`)
- **`GET /api/v1/invoices`**: Lista paginada de faturas individuais.
  - *Query Params:* `page` (padrão: 1), `size` (padrão: 20, max: 100), `status` (opcional: `created`, `credited`).
  - *Resposta:* `Page<Invoice>`
- **`GET /api/v1/invoices/batches`**: Lista paginada de lotes emitidos.
  - *Query Params:* `page` (padrão: 1), `size` (padrão: 20).
  - *Resposta:* `Page<InvoiceBatch>`
- **`POST /api/v1/invoices/batch`**: Dispara emissão manual de lote de 8 a 12 faturas.
  - *Query Params:* `count` (opcional: 1 a 50).
  - *Resposta:* `InvoiceBatch` (`201 Created`)

```typescript
export interface Invoice {
  id: string;
  stark_invoice_id: string | null;
  batch_id: string | null;
  amount: number; // Em centavos (ex: 15000 = R$ 150,00)
  tax_id: string;
  name: string;
  status: "created" | "credited" | "expired" | "canceled";
  created: string;
}

export interface InvoiceBatch {
  id: string;
  cycle_index: number;
  invoice_count: number;
  status: string;
  created: string;
  invoices: Invoice[];
}
```

### 2. Transferências (`/api/v1/transfers`)
- **`GET /api/v1/transfers`**: Lista paginada de transferências de liquidação.
  - *Query Params:* `page` (padrão: 1), `size` (padrão: 20).
  - *Resposta:* `Page<TransferRecord>`

```typescript
export interface TransferRecord {
  id: string;
  stark_transfer_id: string | null;
  stark_invoice_id: string | null;
  event_id: string | null;
  amount: number;      // Bruto (centavos)
  fee: number;         // Taxa (centavos)
  net_amount: number;  // Líquido transferido (centavos)
  target_bank_code: string;
  target_branch: string;
  target_account: string;
  target_name: string;
  target_tax_id: string;
  target_account_type: string;
  status: "success" | "processing" | "failed";
  created: string;
}
```

### 3. Agendador (`/api/v1/scheduler`)
- **`GET /api/v1/scheduler/status`**: Status operacional, contadores e próximo ciclo.
  - *Resposta:* `SchedulerStatus`
- **`POST /api/v1/scheduler/trigger`**: Dispara ciclo manual sob demanda (`202 Accepted`).
- **`PUT /api/v1/scheduler/mode`**: Altera modo de operação (`{"mode": "once" | "recurring"}`).
- **`POST /api/v1/scheduler/reset`**: Reseta histórico de contadores e ciclos no banco.

```typescript
export interface SchedulerStatus {
  scheduled_cycles_completed: number;
  manual_triggers_completed: number;
  max_cycles: number;
  interval_minutes: number;
  remaining_cycles: number;
  mode: "once" | "recurring";
  is_running: boolean;
  next_run_time: string | null;
}
```

---

## 🐳 7. Dockerfile Multi-Stage (com Build-Arg para URL da API)

Como o React/Vite é empacotado estaticamente em tempo de compilação (`build`), a variável `VITE_API_BASE_URL` é injetada através de `ARG` no build do Docker:

```dockerfile
# 1. Build Stage
FROM node:22-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

# Argumento de build para configurar a URL da API em produção
ARG VITE_API_BASE_URL=/api/v1
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# 2. Production Runner Stage (Nginx Slim ~25 MB)
FROM nginx:1.27-alpine-slim AS runner

# Configuração customizada do Nginx para SPA fallback e Cache Control
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Configuração do Nginx (`nginx.conf`)
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff2?|eot|ttf|otf)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, max-age=15552000, immutable";
    }

    # Proxy reverso para o container da API (se estiver rodando na mesma rede Docker)
    location /api/ {
        proxy_pass http://app:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔄 8. Pipeline de CI/CD (GitHub Actions + Secrets + GHCR + Portainer)

Arquivo `.github/workflows/deploy.yml`:
O workflow utiliza a Secret do GitHub (`VITE_API_BASE_URL`) passada como `build-arg` para a imagem Docker, garantindo que o bundle de produção aponte para a URL correta da API.

```yaml
name: Build & Deploy Frontend

on:
  push:
    branches: [master, main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Log in to GitHub Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:latest
          build-args: |
            VITE_API_BASE_URL=${{ secrets.VITE_API_BASE_URL || '/api/v1' }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Trigger Portainer Auto-Deploy Webhook
        if: env.PORTAINER_WEBHOOK_URL != ''
        env:
          PORTAINER_WEBHOOK_URL: ${{ secrets.PORTAINER_WEBHOOK_URL }}
        run: |
          curl -X POST -k "$PORTAINER_WEBHOOK_URL"
```

---

## 🎯 9. Recursos de UX & Produtividade Zoho

1. **Drawer Lateral Expansível (Zoho Style)**:
   - Ao clicar em uma linha de fatura ou transferência, abre-se uma gaveta lateral suave à direita com todos os detalhes (IDs completos, taxas detalhadas, dados bancários do destinatário, payload bruto e botão para copiar com 1 clique).
2. **Exportação Rápida para CSV / JSON**:
   - Em todas as listagens de dados (Faturas e Transferências), há um botão para download imediato dos registros filtrados ou da página atual em formato CSV ou JSON.
3. **Alternância de Tema Claro / Escuro (Dark Mode)**:
   - Suporte nativo completo à classe `dark` do Tailwind com paletas customizadas elegantes para ambos os ambientes.
4. **Filtros e Busca em Tempo Real**:
   - Filtragem instantânea por status (`created`, `credited`, `success`, `processing`), ID e texto.
