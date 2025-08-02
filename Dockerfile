# ----------------------------------
# Stage 1: Build and Prisma Generate
# ----------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Copy project files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY server.mjs ./
COPY prisma ./prisma
COPY public ./public
COPY src ./src

# Install deps and generate Prisma Client
RUN npm install
RUN npx prisma generate
RUN npm run build

# ----------------------------------
# Stage 2: Production Image
# ----------------------------------
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.ts ./
COPY server.mjs ./
COPY public ./public
COPY prisma ./prisma
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Environment
ENV NODE_ENV=production

EXPOSE 3000

# Run the server
CMD ["node", "server.mjs"]
