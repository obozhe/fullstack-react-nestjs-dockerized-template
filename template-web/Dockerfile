# syntax=docker/dockerfile:1
# Install dependencies and build dist
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build 

# Host static
FROM nginx:alpine AS production-deploy
# Build time ARG variable setting for API requests proxy
ARG DOCKERFILE_API_HOST
# Setting build time ARG variable as environment variable for runtime access from containers
ENV API_HOST=$DOCKERFILE_API_HOST
# Copy the build files to the container
COPY --from=build /app/dist /usr/share/nginx/html
# Copy the ngnix.conf.template to the container to apply ENV variables
COPY --from=build /app/nginx/nginx.conf.template /etc/nginx/templates/default.conf.template
# Copy the ngnix.conf to the container
COPY --from=build /app/nginx/nginx.conf /etc/nginx/nginx.conf
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]