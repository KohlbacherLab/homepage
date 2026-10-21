FROM node:24-alpine AS build

WORKDIR /usr/src/app

COPY . .

# The `prepare` script installs husky git hooks, which a build context without
# `.git` neither has nor needs.
ENV HUSKY=0

RUN npm ci && \
    npm run build

FROM nginx:alpine

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/src/.vitepress/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
    CMD wget --proxy off --no-verbose --tries=1 --spider http://127.0.0.1/ || exit 1
