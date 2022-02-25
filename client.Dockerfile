########################################
FROM node:17-alpine AS dependencies

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./shared/package.json ./shared/
COPY ./client/package.json ./client/

RUN npm ci

COPY ./shared/ ./shared/
COPY ./client/ ./client/

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run shared build
RUN npm run client build

RUN npm prune --production --workspaces

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 client
USER client

ENV NODE_ENV production
EXPOSE 3000

CMD ["npm", "run", "client", "start:prod"]
