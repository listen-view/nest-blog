# 使用 Node.js 16 作为基础镜像
FROM node:16.20.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用程序代码到工作目录
COPY . .

# 暴露端口
EXPOSE 3000

# 构建应用程序
RUN [ "npm", "run", "build" ]

# 启动应用程序
CMD [ "npm", "run", "start:prod" ]