FROM node:22-slim AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV DATABASE_URL=postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder?schema=public

RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

FROM base AS deps

COPY package*.json ./
COPY prisma ./prisma
COPY prisma.config.ts ./

RUN npm ci && npx prisma generate

FROM deps AS builder

COPY . .

RUN npm run build

FROM base AS runner

ENV NODE_ENV=production

COPY package*.json ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm run start -- --hostname 0.0.0.0"]