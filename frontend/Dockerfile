FROM node:22 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
RUN apt-get update && \
    apt-get install -y chromium && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
COPY . .

FROM base AS build
ARG VITE_ESCRUTA_BACKEND_URL=http://localhost:6542
ENV VITE_ESCRUTA_BACKEND_URL=$VITE_ESCRUTA_BACKEND_URL
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
