FROM node:18.17-alpine AS development

WORKDIR /api

RUN apk update && \
    apk upgrade && \
    apk add tzdata git

ENV TZ=UTC
ENV NODE_ENV=development

# sh: nest: not found のエラーが出たため追加
RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]

FROM development AS production
WORKDIR /api
COPY ./api .

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start:prod"]
