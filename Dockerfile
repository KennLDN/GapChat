# Stage 1: Build the application
FROM node:14 AS build

WORKDIR /app

COPY package*.json public/index.html server.js ./
RUN npm install

COPY . .

# Stage 2: Create the final image
FROM node:14-slim

WORKDIR /app

COPY --from=build /app ./

EXPOSE 3000

CMD ["node", "server.js"]
