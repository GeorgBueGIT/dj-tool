# backend/Dockerfile
FROM node:18-alpine

RUN apk update && apk add mysql-client

WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]