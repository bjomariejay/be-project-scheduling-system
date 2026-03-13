# Build dependencies and app bundle
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Install only production dependencies
FROM node:20-alpine AS prod-deps
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

# Runtime image
FROM node:20-alpine AS release
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./
EXPOSE 4000
CMD ["node", "server.js"]
