create type "public"."team_role" as enum ('OWNER', 'DEVELOPER');

create table "public"."developer_team" (
    "team_id" uuid not null,
    "user_id" uuid not null,
    "role" team_role not null default 'DEVELOPER'::team_role
);


alter table "public"."developer_team" enable row level security;

create table "public"."teams" (
    "id" uuid not null default gen_random_uuid(),
    "name" text
);


alter table "public"."teams" enable row level security;

CREATE UNIQUE INDEX developer_team_pkey ON public.developer_team USING btree (team_id, user_id);

CREATE UNIQUE INDEX teams_pkey ON public.teams USING btree (id);

alter table "public"."developer_team" add constraint "developer_team_pkey" PRIMARY KEY using index "developer_team_pkey";

alter table "public"."teams" add constraint "teams_pkey" PRIMARY KEY using index "teams_pkey";

alter table "public"."developer_team" add constraint "developer_team_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) not valid;

alter table "public"."developer_team" validate constraint "developer_team_team_id_fkey";

alter table "public"."developer_team" add constraint "developer_team_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_team" validate constraint "developer_team_user_id_fkey";

grant delete on table "public"."developer_team" to "anon";

grant insert on table "public"."developer_team" to "anon";

grant references on table "public"."developer_team" to "anon";

grant select on table "public"."developer_team" to "anon";

grant trigger on table "public"."developer_team" to "anon";

grant truncate on table "public"."developer_team" to "anon";

grant update on table "public"."developer_team" to "anon";

grant delete on table "public"."developer_team" to "authenticated";

grant insert on table "public"."developer_team" to "authenticated";

grant references on table "public"."developer_team" to "authenticated";

grant select on table "public"."developer_team" to "authenticated";

grant trigger on table "public"."developer_team" to "authenticated";

grant truncate on table "public"."developer_team" to "authenticated";

grant update on table "public"."developer_team" to "authenticated";

grant delete on table "public"."developer_team" to "service_role";

grant insert on table "public"."developer_team" to "service_role";

grant references on table "public"."developer_team" to "service_role";

grant select on table "public"."developer_team" to "service_role";

grant trigger on table "public"."developer_team" to "service_role";

grant truncate on table "public"."developer_team" to "service_role";

grant update on table "public"."developer_team" to "service_role";

grant delete on table "public"."teams" to "anon";

grant insert on table "public"."teams" to "anon";

grant references on table "public"."teams" to "anon";

grant select on table "public"."teams" to "anon";

grant trigger on table "public"."teams" to "anon";

grant truncate on table "public"."teams" to "anon";

grant update on table "public"."teams" to "anon";

grant delete on table "public"."teams" to "authenticated";

grant insert on table "public"."teams" to "authenticated";

grant references on table "public"."teams" to "authenticated";

grant select on table "public"."teams" to "authenticated";

grant trigger on table "public"."teams" to "authenticated";

grant truncate on table "public"."teams" to "authenticated";

grant update on table "public"."teams" to "authenticated";

grant delete on table "public"."teams" to "service_role";

grant insert on table "public"."teams" to "service_role";

grant references on table "public"."teams" to "service_role";

grant select on table "public"."teams" to "service_role";

grant trigger on table "public"."teams" to "service_role";

grant truncate on table "public"."teams" to "service_role";

grant update on table "public"."teams" to "service_role";


