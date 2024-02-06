# Sử dụng một base image chứa Node.js
FROM node:16

# Tạo một thư mục làm việc cho ứng dụng
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mạng của ứng dụng
EXPOSE 3000

# Chạy NestJS ứng dụng
CMD ["npm","run", "start"]
