FROM node:22.11.0-alpine

RUN npm install -g corepack@latest && corepack enable pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY ./supabase ./supabase

# pnpm supabase db push --db-url="postgres://$SUPABASE_PG_HOST:$SUPABASE_PG_PASS@$SUPABASE_HOST:$SUPABASE_PG_PORT/postgres"
CMD ["sh", "-c", "pnpm supabase db push --db-url='postgres://${SUPABASE_PG_HOST}:${SUPABASE_PG_PASS}@${SUPABASE_HOST}:${SUPABASE_PG_PORT}/postgres'"]
