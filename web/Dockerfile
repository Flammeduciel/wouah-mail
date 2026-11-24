# Wouah Mail, web test version (Gmail + Google Contacts) for the Google review.
# Dokploy (Compose): web/docker-compose.yml, context = repository root.
FROM node:22-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
COPY patches ./patches
RUN npm ci --no-audit --no-fund
COPY . .
# OAuth client of type « Web application » (Google Cloud, same project as the app).
ARG EXPO_PUBLIC_GMAIL_WEB_CLIENT_ID
ENV EXPO_PUBLIC_GMAIL_WEB_CLIENT_ID=$EXPO_PUBLIC_GMAIL_WEB_CLIENT_ID
RUN test -n "$EXPO_PUBLIC_GMAIL_WEB_CLIENT_ID" || (echo "EXPO_PUBLIC_GMAIL_WEB_CLIENT_ID is required" && exit 1)
RUN npx expo export --platform web --output-dir dist

FROM nginx:1.27-alpine
COPY web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
