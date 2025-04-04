alter table "public"."api_tokens" drop constraint "api_tokens_pkey";

alter table "public"."developer_file_operations" drop constraint "developer_file_operations_pkey";

alter table "public"."developer_loc_per_day" drop constraint "developer_loc_per_day_pkey";

alter table "public"."developer_time_spent_per_day" drop constraint "developer_time_spent_per_day_pkey";

alter table "public"."developer_total_loc" drop constraint "developer_total_loc_pkey";

drop index if exists "public"."api_tokens_pkey";

drop index if exists "public"."developer_file_operations_pkey";

drop index if exists "public"."developer_loc_per_day_pkey";

drop index if exists "public"."developer_time_spent_per_day_pkey";

drop index if exists "public"."developer_total_loc_pkey";

alter table "public"."api_tokens" add column "team_id" uuid not null;

alter table "public"."developer_file_operations" add column "team_id" uuid not null;

alter table "public"."developer_loc_per_day" add column "team_id" uuid not null;

alter table "public"."developer_time_spent_per_day" add column "team_id" uuid not null;

alter table "public"."developer_total_loc" add column "team_id" uuid not null;

CREATE UNIQUE INDEX api_tokens_pkey ON public.api_tokens USING btree (id, user_id, team_id);

CREATE UNIQUE INDEX developer_file_operations_pkey ON public.developer_file_operations USING btree (operation, filename, team_id);

CREATE UNIQUE INDEX developer_loc_per_day_pkey ON public.developer_loc_per_day USING btree (datetime, team_id);

CREATE UNIQUE INDEX developer_time_spent_per_day_pkey ON public.developer_time_spent_per_day USING btree (date, user_id, team_id);

CREATE UNIQUE INDEX developer_total_loc_pkey ON public.developer_total_loc USING btree (user_id, filename, team_id);

alter table "public"."api_tokens" add constraint "api_tokens_pkey" PRIMARY KEY using index "api_tokens_pkey";

alter table "public"."developer_file_operations" add constraint "developer_file_operations_pkey" PRIMARY KEY using index "developer_file_operations_pkey";

alter table "public"."developer_loc_per_day" add constraint "developer_loc_per_day_pkey" PRIMARY KEY using index "developer_loc_per_day_pkey";

alter table "public"."developer_time_spent_per_day" add constraint "developer_time_spent_per_day_pkey" PRIMARY KEY using index "developer_time_spent_per_day_pkey";

alter table "public"."developer_total_loc" add constraint "developer_total_loc_pkey" PRIMARY KEY using index "developer_total_loc_pkey";

alter table "public"."api_tokens" add constraint "api_tokens_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."api_tokens" validate constraint "api_tokens_team_id_fkey";

alter table "public"."developer_file_operations" add constraint "developer_file_operations_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_file_operations" validate constraint "developer_file_operations_team_id_fkey";

alter table "public"."developer_loc_per_day" add constraint "developer_loc_per_day_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_loc_per_day" validate constraint "developer_loc_per_day_team_id_fkey";

alter table "public"."developer_time_spent_per_day" add constraint "developer_time_spent_per_day_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_time_spent_per_day" validate constraint "developer_time_spent_per_day_team_id_fkey";

alter table "public"."developer_total_loc" add constraint "developer_total_loc_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_total_loc" validate constraint "developer_total_loc_team_id_fkey";


