# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

WORKDIR /api

# このレイヤーに変更がなければキャッシュを利用。
COPY ./api/package*.json ./

# Alpine Linuxイメージを使用しているため,
# `apk`パッケージマネージャを利用。
RUN apk update && \
    apk upgrade && \
    # --no-cacheオプにより、キャッシュを自動で削除。
    apk add --no-cache tzdata curl

# package*.json に変更がなければ、
# このレイヤーもキャッシュとして再利用。
RUN npm install

# プロジェクト全体をコピー
COPY ./api ./

ENV TZ=UTC

# 開発用のステージ
FROM base AS dev

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]

# 本番用のステージ
FROM base AS prod

ENV NODE_ENV=production

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start:prod"]
