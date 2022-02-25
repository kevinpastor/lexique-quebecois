########################################
FROM node:17-alpine AS dependencies

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./shared/package.json ./shared/
COPY ./client/package.json ./client/
COPY ./server/package.json ./server/

RUN npm ci

COPY . .

# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run shared build
RUN npm run client build

RUN npm prune --production --workspaces

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

EXPOSE 3000
CMD ["npm", "run", "client", "start:prod"]
