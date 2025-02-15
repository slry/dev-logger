alter table "public"."api_tokens" add column "expires_at" date not null default now();


