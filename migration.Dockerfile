FROM node:22.11.0-alpine

WORKDIR /app

RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY ./scripts ./scripts

CMD ["pnpm", "supabase:migrate"]
