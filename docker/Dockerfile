ARG NUXT_PUBLIC_PREZ_API_ENDPOINT=https://icsm-prez.dev.itp.cam.kurrawong.ai
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

RUN pnpm dlx create-prez-app@latest prez-ui \
    && sed -i 's/workspace:\*/^4.0.0/' prez-ui/package.json \
    && pnpm install --prefix prez-ui

RUN cd prez-ui && NUXT_PUBLIC_PREZ_API_ENDPOINT=$NUXT_PUBLIC_PREZ_API_ENDPOINT pnpm generate

#
# Final
#
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/prez-ui/dist /usr/share/nginx/html
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]