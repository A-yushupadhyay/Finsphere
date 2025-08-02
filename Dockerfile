# Stage 1: Build and generate Prisma client
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY prisma ./prisma
COPY . ./

RUN npm install
RUN npx prisma generate
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Copy node modules and built files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/server.mjs ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.prisma ./node_modules/.prisma  

ENV NODE_ENV=production

EXPOSE 3000
EXPOSE 3001

CMD ["node", "server.mjs"]
