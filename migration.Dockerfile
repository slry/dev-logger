# === Build Stage ===
FROM node:22-alpine AS builder

# Extract just the Supabase CLI version
COPY package.json ./
RUN apk add --no-cache jq && \
  jq -r '.dependencies.supabase // empty' package.json > /supabase-version.txt

# === Runtime Stage ===
FROM node:22-alpine

# Copy extracted Supabase CLI version
COPY --from=builder /supabase-version.txt /supabase-version.txt
COPY ./supabase ./supabase

# Install only corepack if you want, but it's unused here

# Run migration with specific CLI version
CMD ["sh", "-c", "npx supabase@$(cat /supabase-version.txt) db push --db-url=postgres://${SUPABASE_PG_HOST}:${SUPABASE_PG_PASS}@${SUPABASE_HOST}:${SUPABASE_PG_PORT}/postgres"]
