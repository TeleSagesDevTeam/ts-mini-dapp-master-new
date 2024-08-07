# Builder stage
FROM node:lts-alpine AS builder
ARG BOT_KEY
ARG SECRET
ARG POCKETBASE_URL
ARG BACKEND_TOKEN
ARG DAPP_URL
ARG PUBLIC_CONTRACT_ADDRESS
ARG PUBLIC_RPC_URL
ARG PUBLIC_SCANNER_URL
ARG PUBLIC_BOT_URL

# Set environment variables for build
ENV BOT_KEY=${BOT_KEY} \
    SECRET=${SECRET} \
    POCKETBASE_URL=${POCKETBASE_URL} \
    BACKEND_TOKEN=${BACKEND_TOKEN} \
    DAPP_URL=${DAPP_URL} \
    PUBLIC_CONTRACT_ADDRESS=${PUBLIC_CONTRACT_ADDRESS} \
    PUBLIC_RPC_URL=${PUBLIC_RPC_URL} \
    PUBLIC_SCANNER_URL=${PUBLIC_SCANNER_URL} \
    PUBLIC_BOT_URL=${PUBLIC_BOT_URL}

WORKDIR /app
RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && \
chmod +x /bin/pnpm

COPY . .
RUN pnpm install
RUN pnpm build

# Runtime stage
FROM node:lts-alpine
# Set environment variables for runtime
ENV NODE_ENV=production \
    BOT_KEY=${BOT_KEY} \
    SECRET=${SECRET} \
    POCKETBASE_URL=${POCKETBASE_URL} \
    BACKEND_TOKEN=${BACKEND_TOKEN} \
    DAPP_URL=${DAPP_URL} \
    PUBLIC_CONTRACT_ADDRESS=${PUBLIC_CONTRACT_ADDRESS} \
    PUBLIC_RPC_URL=${PUBLIC_RPC_URL} \
    PUBLIC_SCANNER_URL=${PUBLIC_SCANNER_URL} \
    PUBLIC_BOT_URL=${PUBLIC_BOT_URL}

WORKDIR /app
# Copy built artifacts and node_modules from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "./build/index.js"]
