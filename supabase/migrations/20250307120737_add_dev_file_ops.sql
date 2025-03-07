revoke delete on table "public"."developer_create_file" from "anon";

revoke insert on table "public"."developer_create_file" from "anon";

revoke references on table "public"."developer_create_file" from "anon";

revoke select on table "public"."developer_create_file" from "anon";

revoke trigger on table "public"."developer_create_file" from "anon";

revoke truncate on table "public"."developer_create_file" from "anon";

revoke update on table "public"."developer_create_file" from "anon";

revoke delete on table "public"."developer_create_file" from "authenticated";

revoke insert on table "public"."developer_create_file" from "authenticated";

revoke references on table "public"."developer_create_file" from "authenticated";

revoke select on table "public"."developer_create_file" from "authenticated";

revoke trigger on table "public"."developer_create_file" from "authenticated";

revoke truncate on table "public"."developer_create_file" from "authenticated";

revoke update on table "public"."developer_create_file" from "authenticated";

revoke delete on table "public"."developer_create_file" from "service_role";

revoke insert on table "public"."developer_create_file" from "service_role";

revoke references on table "public"."developer_create_file" from "service_role";

revoke select on table "public"."developer_create_file" from "service_role";

revoke trigger on table "public"."developer_create_file" from "service_role";

revoke truncate on table "public"."developer_create_file" from "service_role";

revoke update on table "public"."developer_create_file" from "service_role";

revoke delete on table "public"."developer_delete_file" from "anon";

revoke insert on table "public"."developer_delete_file" from "anon";

revoke references on table "public"."developer_delete_file" from "anon";

revoke select on table "public"."developer_delete_file" from "anon";

revoke trigger on table "public"."developer_delete_file" from "anon";

revoke truncate on table "public"."developer_delete_file" from "anon";

revoke update on table "public"."developer_delete_file" from "anon";

revoke delete on table "public"."developer_delete_file" from "authenticated";

revoke insert on table "public"."developer_delete_file" from "authenticated";

revoke references on table "public"."developer_delete_file" from "authenticated";

revoke select on table "public"."developer_delete_file" from "authenticated";

revoke trigger on table "public"."developer_delete_file" from "authenticated";

revoke truncate on table "public"."developer_delete_file" from "authenticated";

revoke update on table "public"."developer_delete_file" from "authenticated";

revoke delete on table "public"."developer_delete_file" from "service_role";

revoke insert on table "public"."developer_delete_file" from "service_role";

revoke references on table "public"."developer_delete_file" from "service_role";

revoke select on table "public"."developer_delete_file" from "service_role";

revoke trigger on table "public"."developer_delete_file" from "service_role";

revoke truncate on table "public"."developer_delete_file" from "service_role";

revoke update on table "public"."developer_delete_file" from "service_role";

alter table "public"."developer_create_file" drop constraint "developer_create_file_user_id_fkey";

alter table "public"."developer_delete_file" drop constraint "developer_delete_file_user_id_fkey";

alter table "public"."developer_create_file" drop constraint "developer_create_file_pkey";

alter table "public"."developer_delete_file" drop constraint "developer_delete_file_pkey";

drop index if exists "public"."developer_create_file_pkey";

drop index if exists "public"."developer_delete_file_pkey";

drop table "public"."developer_create_file";

drop table "public"."developer_delete_file";

create table "public"."developer_file_operations" (
    "user_id" uuid not null,
    "filename" text not null default ''::text,
    "timestamp" timestamp with time zone not null
);


alter table "public"."developer_file_operations" enable row level security;

CREATE UNIQUE INDEX developer_file_operations_pkey ON public.developer_file_operations USING btree (user_id);

alter table "public"."developer_file_operations" add constraint "developer_file_operations_pkey" PRIMARY KEY using index "developer_file_operations_pkey";

alter table "public"."developer_file_operations" add constraint "developer_file_operations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_file_operations" validate constraint "developer_file_operations_user_id_fkey";

grant delete on table "public"."developer_file_operations" to "anon";

grant insert on table "public"."developer_file_operations" to "anon";

grant references on table "public"."developer_file_operations" to "anon";

grant select on table "public"."developer_file_operations" to "anon";

grant trigger on table "public"."developer_file_operations" to "anon";

grant truncate on table "public"."developer_file_operations" to "anon";

grant update on table "public"."developer_file_operations" to "anon";

grant delete on table "public"."developer_file_operations" to "authenticated";

grant insert on table "public"."developer_file_operations" to "authenticated";

grant references on table "public"."developer_file_operations" to "authenticated";

grant select on table "public"."developer_file_operations" to "authenticated";

grant trigger on table "public"."developer_file_operations" to "authenticated";

grant truncate on table "public"."developer_file_operations" to "authenticated";

grant update on table "public"."developer_file_operations" to "authenticated";

grant delete on table "public"."developer_file_operations" to "service_role";

grant insert on table "public"."developer_file_operations" to "service_role";

grant references on table "public"."developer_file_operations" to "service_role";

grant select on table "public"."developer_file_operations" to "service_role";

grant trigger on table "public"."developer_file_operations" to "service_role";

grant truncate on table "public"."developer_file_operations" to "service_role";

grant update on table "public"."developer_file_operations" to "service_role";

create policy "Enable users to view their own data only"
on "public"."developer_file_operations"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



