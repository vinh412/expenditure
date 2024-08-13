ARG NODE_VERSION="22.4.1-alpine"
### base image ###
FROM node:${NODE_VERSION} AS base
WORKDIR /app

### build stage ###
FROM base AS build
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

### run stage ###
FROM base AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/build /app/build
EXPOSE 80
ENTRYPOINT serve -s -p 80 build