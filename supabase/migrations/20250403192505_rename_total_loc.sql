drop policy "Enable users to view their own data only" on "public"."developer_total_loc";

revoke delete on table "public"."developer_total_loc" from "anon";

revoke insert on table "public"."developer_total_loc" from "anon";

revoke references on table "public"."developer_total_loc" from "anon";

revoke select on table "public"."developer_total_loc" from "anon";

revoke trigger on table "public"."developer_total_loc" from "anon";

revoke truncate on table "public"."developer_total_loc" from "anon";

revoke update on table "public"."developer_total_loc" from "anon";

revoke delete on table "public"."developer_total_loc" from "authenticated";

revoke insert on table "public"."developer_total_loc" from "authenticated";

revoke references on table "public"."developer_total_loc" from "authenticated";

revoke select on table "public"."developer_total_loc" from "authenticated";

revoke trigger on table "public"."developer_total_loc" from "authenticated";

revoke truncate on table "public"."developer_total_loc" from "authenticated";

revoke update on table "public"."developer_total_loc" from "authenticated";

revoke delete on table "public"."developer_total_loc" from "service_role";

revoke insert on table "public"."developer_total_loc" from "service_role";

revoke references on table "public"."developer_total_loc" from "service_role";

revoke select on table "public"."developer_total_loc" from "service_role";

revoke trigger on table "public"."developer_total_loc" from "service_role";

revoke truncate on table "public"."developer_total_loc" from "service_role";

revoke update on table "public"."developer_total_loc" from "service_role";

alter table "public"."developer_total_loc" drop constraint "developer_total_loc_team_id_fkey";

alter table "public"."developer_total_loc" drop constraint "developer_total_loc_user_id_fkey";

alter table "public"."developer_total_loc" drop constraint "developer_total_loc_pkey";

drop index if exists "public"."developer_total_loc_pkey";

drop table "public"."developer_total_loc";

create table "public"."developer_loc_per_file" (
    "user_id" uuid not null,
    "filename" text not null default ''::text,
    "loc_added" bigint not null default '0'::bigint,
    "loc_removed" bigint not null default '0'::bigint,
    "team_id" uuid not null
);


alter table "public"."developer_loc_per_file" enable row level security;

CREATE UNIQUE INDEX developer_loc_per_file_pkey ON public.developer_loc_per_file USING btree (user_id, filename, team_id);

alter table "public"."developer_loc_per_file" add constraint "developer_loc_per_file_pkey" PRIMARY KEY using index "developer_loc_per_file_pkey";

alter table "public"."developer_loc_per_file" add constraint "developer_total_loc_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_loc_per_file" validate constraint "developer_total_loc_team_id_fkey";

alter table "public"."developer_loc_per_file" add constraint "developer_total_loc_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_loc_per_file" validate constraint "developer_total_loc_user_id_fkey";

grant delete on table "public"."developer_loc_per_file" to "anon";

grant insert on table "public"."developer_loc_per_file" to "anon";

grant references on table "public"."developer_loc_per_file" to "anon";

grant select on table "public"."developer_loc_per_file" to "anon";

grant trigger on table "public"."developer_loc_per_file" to "anon";

grant truncate on table "public"."developer_loc_per_file" to "anon";

grant update on table "public"."developer_loc_per_file" to "anon";

grant delete on table "public"."developer_loc_per_file" to "authenticated";

grant insert on table "public"."developer_loc_per_file" to "authenticated";

grant references on table "public"."developer_loc_per_file" to "authenticated";

grant select on table "public"."developer_loc_per_file" to "authenticated";

grant trigger on table "public"."developer_loc_per_file" to "authenticated";

grant truncate on table "public"."developer_loc_per_file" to "authenticated";

grant update on table "public"."developer_loc_per_file" to "authenticated";

grant delete on table "public"."developer_loc_per_file" to "service_role";

grant insert on table "public"."developer_loc_per_file" to "service_role";

grant references on table "public"."developer_loc_per_file" to "service_role";

grant select on table "public"."developer_loc_per_file" to "service_role";

grant trigger on table "public"."developer_loc_per_file" to "service_role";

grant truncate on table "public"."developer_loc_per_file" to "service_role";

grant update on table "public"."developer_loc_per_file" to "service_role";

create policy "Enable users to view their own data only"
on "public"."developer_loc_per_file"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



