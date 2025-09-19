FROM node:22-alpine3.21 AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

FROM base AS build
RUN npm run build

FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
