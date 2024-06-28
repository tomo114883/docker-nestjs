# syntax=docker/dockerfile:1
FROM postgres:14.12-alpine3.20

ENV TZ UTC

# Alpine Linuxイメージを使用しているため,
# `apk`パッケージマネージャを利用。
RUN apk update && \
    apk upgrade && \
    # --no-cacheオプにより、キャッシュを自動で削除。
    apk add --no-cache tzdata git