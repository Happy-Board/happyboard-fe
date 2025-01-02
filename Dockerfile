FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:lts-alpine as run-stage

WORKDIR /app

COPY --from=build-stage /app /app

EXPOSE 8888

CMD ["npm", "run", "dev"]
