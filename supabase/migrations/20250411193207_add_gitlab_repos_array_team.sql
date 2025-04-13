alter table "public"."teams" add column "gitlab_repos" text[] not null default '{}'::text[];


