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

# FROM node:lts-alpine as base
# WORKDIR /app
# COPY . .
# COPY package*.json ./
# COPY node_modules /app/node_modules
# EXPOSE 8888
# CMD ["npm", "run", "dev"]

# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 8888
# # RUN npm run build
# CMD ["npm", "run", "dev"]

FROM node:lts-alpine as base
WORKDIR /app

# Sao chép mã nguồn và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Đảm bảo node_modules/.bin có trong PATH
ENV PATH="./node_modules/.bin:$PATH"

# Thêm quyền thực thi cho vite
RUN chmod +x node_modules/.bin/vite

# Mở cổng và chạy ứng dụng
EXPOSE 8888
CMD ["npm", "run", "dev"]
