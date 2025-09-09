### Étape 1 : Build
FROM node:24.2.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
# Build le projet (adapte la commande si besoin)
RUN npm run build

### Étape 2 : Exécution
FROM node:24.2.0-alpine AS runner
WORKDIR /app

# Copie uniquement le nécessaire depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/infrastructure/rest/server.js"]
