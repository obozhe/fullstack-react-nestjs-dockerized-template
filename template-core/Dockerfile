# Install dependencies
FROM node:20-alpine As dependencies-install
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Use dependencies to build the dist and reinstall only needed deps for prod run
FROM node:20-alpine As build
WORKDIR /app
COPY package*.json ./
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production --ignore-scripts && npm cache clean --force

# Use prod dependencies and generated dist to run build bundle
FROM node:20-alpine As production-deploy
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
CMD [ "node", "dist/main.js" ]
