# syntax=docker/dockerfile:1
FROM node:20-alpine3.20 AS base

WORKDIR /api

# if this layer is not changed, the cache is used.
COPY ./api/package*.json ./

# Use the "apk" package manager for "Alpine Linux" image.
RUN apk update && \
    apk upgrade && \
    # This "--no-cache" option automatically removes the cache.
    apk add --no-cache tzdata curl

# If the package*.json are not changed, this layer is also reused.
RUN npm install

# Copy the entire project.
COPY ./api ./

ENV TZ=UTC

EXPOSE 3000

# Stage for Development
FROM base AS dev

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]

# Stage for Deployment
FROM base AS prod

ENV NODE_ENV=production

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start:prod"]
