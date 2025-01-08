# # build stage
# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# # RUN npm install
# COPY . .
# # run stage
# FROM node:lts-alpine as run-stage
# WORKDIR /app
# COPY --from=build-stage /app /app
# EXPOSE 8888
# CMD ["npm", "run", "dev"]

FROM node:lts-alpine as base
WORKDIR /app
COPY . .
COPY package*.json ./
COPY node_modules /app/node_modules
EXPOSE 8888
CMD ["npm", "run", "dev"]