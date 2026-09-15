FROM node:22.12.0-bookworm-slim AS base

# Installing the pinned pnpm release directly avoids Corepack key rotation
# failures in older Node base-image releases.
RUN npm install --global pnpm@10.22.0
WORKDIR /app

FROM base AS dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS build

COPY . ./

# Astro uses these public values when generating canonical URLs, the sitemap and
# Keystatic's browser bundle. No secrets are passed to the image build.
ARG SITE_URL
ARG PUBLIC_KEYSTATIC_GITHUB_APP_SLUG
ENV SITE_URL="$SITE_URL"
ENV PUBLIC_KEYSTATIC_GITHUB_APP_SLUG="$PUBLIC_KEYSTATIC_GITHUB_APP_SLUG"

RUN pnpm build

FROM base AS production-dependencies

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

FROM base AS runner

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PORT="4321"

COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package.json ./package.json

USER node
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
