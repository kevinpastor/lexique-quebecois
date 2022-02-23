########################################
FROM node:17-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
COPY shared/package.json ./shared/
COPY client/package.json ./client/
COPY server/package.json ./server/
RUN npm ci

########################################
FROM node:17-alpine AS client-builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build:client

########################################
FROM node:17-alpine AS server-builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build:shared
RUN npm run build:server

########################################
FROM node:17-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server

COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./package.json

WORKDIR /app/client
COPY --from=client-builder /app/client/next.config.js ./
COPY --from=client-builder /app/client/build ./build
COPY --from=client-builder /app/client/public ./public
COPY --from=client-builder /app/client/package.json ./package.json

WORKDIR /app/shared
COPY --from=server-builder /app/shared/build ./build
COPY --from=server-builder /app/shared/package.json ./package.json

WORKDIR /app/server
COPY --from=server-builder /app/server/build ./build
COPY --from=server-builder /app/server/package.json ./package.json

WORKDIR /app
USER server

EXPOSE 80

ENV PORT 80

CMD ["npm", "run", "server", "exec"]
