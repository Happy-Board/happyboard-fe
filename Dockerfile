# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "dev"]
# production stage
FROM nginx:latest
# Copy the custom configuration file to the Nginx configuration directory
COPY default.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80
# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
