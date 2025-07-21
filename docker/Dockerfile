ARG NUXT_PUBLIC_PREZ_API_ENDPOINT=https://icsm-api.qlocation.information.qld.gov.au
ARG NODE_VERSION=20
ARG PNPM_VERSION=9.0.5

#
# Builder
#
FROM node:${NODE_VERSION}-alpine AS builder
ARG PNPM_VERSION
ARG NUXT_PUBLIC_PREZ_API_ENDPOINT
ENV NUXT_PUBLIC_PREZ_API_ENDPOINT=$NUXT_PUBLIC_PREZ_API_ENDPOINT
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN corepack enable && \
    corepack install --global pnpm@${PNPM_VERSION}

WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
RUN NUXT_PUBLIC_PREZ_API_ENDPOINT=$NUXT_PUBLIC_PREZ_API_ENDPOINT pnpm generate

#
# Final
#
FROM caddy:2-alpine

RUN apk add --no-cache \
    # Used to perform health checks
    curl

COPY --from=builder /app/dist /srv
COPY ./docker/Caddyfile /etc/caddy/Caddyfile
EXPOSE 3000