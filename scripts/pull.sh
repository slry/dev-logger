#!/bin/bash

set -o allexport; source .env.local; set +o allexport
pnpm supabase db pull --db-url="postgres://$SUPABASE_PG_HOST:$SUPABASE_PG_PASS@$SUPABASE_HOST:$SUPABASE_PG_PORT/postgres"
