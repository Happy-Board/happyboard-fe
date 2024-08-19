# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# RUN npm run build
CMD ["npm", "run", "dev"]
# production stage
# FROM nginx as deploy-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD [ "nginx", "-g", "daemon off;" ]
