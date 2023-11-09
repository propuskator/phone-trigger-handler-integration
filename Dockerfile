FROM node:14.16-alpine as base

USER root

ENV NPM_CONFIG_PREFIX=/app/.npm-global
ENV HOME=/app

RUN mkdir .npm-global
RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./
COPY lib lib
COPY etc etc
COPY app.js ./

RUN npm ci --production

CMD ["npm", "start"]
