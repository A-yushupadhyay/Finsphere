# Stage 1: Install dependencies and build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY prisma ./prisma
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/server.mjs ./server.mjs

RUN npm install --omit=dev

EXPOSE 3000
EXPOSE 3001

CMD ["npm", "start"]
