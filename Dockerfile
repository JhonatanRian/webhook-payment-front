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
