alter table "public"."developer_file_operations" add column "repo_url" text;

alter table "public"."developer_loc_per_day" add column "repo_url" text;

alter table "public"."developer_loc_per_file" add column "repo_url" text;

alter table "public"."developer_time_spent_per_day" add column "repo_url" text;


