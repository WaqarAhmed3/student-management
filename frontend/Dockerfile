# Development Stage
FROM node:18-alpine AS development

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Add linting fix command
RUN npm run lint -- --fix

# Use for live reload in development
CMD ["npm", "start"]

# Production Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf