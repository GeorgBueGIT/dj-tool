# frontend/Dockerfile
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /code

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application code
COPY public/ ./public
COPY src/ ./src

# Command to start the application
CMD [ "npm", "start" ]
