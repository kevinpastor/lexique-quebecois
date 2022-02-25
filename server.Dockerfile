FROM node:17-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./shared/package.json ./shared/
COPY ./server/package.json ./server/

RUN npm ci

COPY ./shared/ ./shared/
COPY ./server/ ./server/

RUN npm run shared build
RUN npm run server build

RUN npm prune --production --workspaces

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 server
USER server

ENV NODE_ENV production

EXPOSE 8080

CMD ["npm", "run", "server", "exec"]
