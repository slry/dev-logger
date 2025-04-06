FROM node:22.11.0-alpine

RUN npm install -g corepack@latest && corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY ./scripts ./scripts

CMD ["pnpm", "supabase:migrate"]
