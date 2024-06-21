# Dockerfile Frontend
FROM node:18-alpine

WORKDIR /frontend/code

COPY ./public/ ./public
COPY ./src/ ./src
COPY ./package.json ./

RUN npm install

CMD [ "npm", "start" ]
