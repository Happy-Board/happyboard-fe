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

# Sao chép toàn bộ file từ host vào container, bao gồm cả node_modules
COPY . .

# Mở cổng ứng dụng
EXPOSE 8888

# Chạy ứng dụng
CMD ["npm", "run", "dev"]