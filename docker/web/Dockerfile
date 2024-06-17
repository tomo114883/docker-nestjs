FROM node:21-alpine3.18 AS development

EXPOSE 3000
WORKDIR /web
ENV TZ=UTC

RUN apk update && \
    apk upgrade && \
    apk add --no-cache tzdata curl

CMD ["npm", "run", "dev"]

FROM development AS production
WORKDIR /web
COPY ./web .

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start"]