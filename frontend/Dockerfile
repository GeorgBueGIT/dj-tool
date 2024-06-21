# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /code

COPY .frontend/public/ /frontend/code/public
COPY .frontend/src/ /frontend/code/src
COPY ./frontend/package.json /frontend/code/

RUN npm install

CMD [ "npm", "start" ]
