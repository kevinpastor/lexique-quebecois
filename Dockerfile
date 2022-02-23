########################################
FROM node:17-alpine AS dependencies

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./shared/package.json ./shared/
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/

RUN npm ci

########################################
FROM node:17-alpine AS shared-builder

WORKDIR /app

COPY ./package.json ./
COPY --from=dependencies /app/node_modules/ ./node_modules/
COPY ./shared/ ./shared/

RUN npm run shared build

########################################
FROM node:17-alpine AS client-builder

WORKDIR /app

COPY ./package.json ./
COPY --from=dependencies /app/node_modules/ ./node_modules/
COPY --from=shared-builder /app/shared/ ./shared/
COPY ./client/ ./client/

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run client build

########################################
FROM node:17-alpine AS server-builder

WORKDIR /app

COPY ./package.json ./
COPY --from=dependencies /app/node_modules/ ./node_modules/
COPY --from=shared-builder /app/shared/ ./shared/
COPY ./server/ ./server/

RUN npm run server build

########################################
FROM node:17-alpine AS production-dependencies

WORKDIR /app

COPY ./package.json ./
COPY --from=dependencies /app/node_modules/ ./node_modules/
COPY ./server/package.json ./server/

RUN npm prune --production --workspaces

########################################
FROM node:17-alpine AS runner

WORKDIR /app

COPY ./package.json ./
COPY --from=production-dependencies /app/node_modules/ ./node_modules/

COPY ./client/package.json ./client/
COPY ./client/next.config.js ./client/
COPY ./client/public/ ./client/public/
COPY --from=client-builder /app/client/build/ ./client/build/

COPY ./shared/package.json ./shared/
COPY --from=shared-builder /app/shared/build/ ./shared/build/

COPY ./server/package.json ./server/
COPY --from=server-builder /app/server/build/ ./server/build/

ENV NODE_ENV production
ENV PORT 80

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server

EXPOSE 80
CMD ["npm", "run", "server", "exec"]
