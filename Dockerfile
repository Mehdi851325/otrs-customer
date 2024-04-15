# Use official node image as base
FROM docker.si24.ir/node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm config set registry  https://repo.si24.ir/repository/npm/
RUN npm install

# Copy all files
COPY . .

# Build the app
RUN npm run build

# Use Nginx as base image for serving static files
FROM docker.si24.ir/nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

