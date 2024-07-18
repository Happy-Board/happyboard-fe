#build stage
FROM node:16 as build-stage 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

#deploy stage
# FROM nginx:latest
# COPY default.conf /etc/nginx/conf.d/default.conf
# # Expose port 80
# EXPOSE 80
# # Command to run Nginx
# CMD ["nginx", "-g", "daemon off;"]
