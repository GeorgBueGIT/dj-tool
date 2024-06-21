# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /code

COPY public/ /code/public
COPY src/ /code/src
COPY ./package.json /code/

RUN npm install

CMD [ "npm", "start" ]
