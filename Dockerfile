########################################
FROM node:17-alpine AS dependencies

WORKDIR /app
COPY ./package.json ./package-lock.json ./
COPY ./shared/package.json ./shared/
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/

RUN npm ci

########################################
FROM node:17-alpine AS client-builder

WORKDIR /app
COPY ./package.json ./
COPY ./client ./client
COPY ./shared ./shared
COPY --from=dependencies /app/node_modules ./node_modules

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build:client

########################################
FROM node:17-alpine AS server-builder

WORKDIR /app
COPY ./package.json ./
COPY ./shared ./shared
COPY ./server ./server
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm run build:shared
RUN npm run build:server

########################################
FROM node:17-alpine AS production-dependencies

WORKDIR /app
COPY ./package.json ./
COPY ./server/package.json ./server/
COPY --from=dependencies /app/node_modules ./node_modules

RUN npm prune  --production --workspaces

########################################
FROM node:17-alpine AS runner

WORKDIR /app
COPY ./package.json ./
COPY --from=production-dependencies /app/node_modules ./node_modules

WORKDIR /app/client
COPY ./client/package.json ./
COPY ./client/next.config.js ./
COPY ./client/public ./public
COPY --from=client-builder /app/client/build ./build

WORKDIR /app/shared
COPY ./shared/package.json ./
COPY --from=server-builder /app/shared/build ./build

WORKDIR /app/server
COPY ./server/package.json ./
COPY --from=server-builder /app/server/build ./build

ENV NODE_ENV production
ENV PORT 80

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server

WORKDIR /app
EXPOSE 80
CMD ["npm", "run", "server", "exec"]
