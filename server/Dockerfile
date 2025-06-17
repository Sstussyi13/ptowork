# Dockerfile for backend
FROM node:18

WORKDIR /app

COPY . .

WORKDIR /app/server

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
