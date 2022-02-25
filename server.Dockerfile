########################################
FROM node:17-alpine AS dependencies

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./shared/package.json ./shared/
COPY ./server/package.json ./server/

RUN npm ci

COPY . .

RUN npm run shared build
RUN npm run server build

RUN npm prune --production --workspaces

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server

EXPOSE 8080
CMD ["npm", "run", "server", "exec"]
