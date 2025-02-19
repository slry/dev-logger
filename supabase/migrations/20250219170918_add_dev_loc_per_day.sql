create table "public"."developer_loc_per_day" (
    "id" bigint generated by default as identity not null,
    "user_id" uuid not null,
    "datetime" timestamp with time zone not null default now(),
    "loc" bigint not null default '0'::bigint
);


alter table "public"."developer_loc_per_day" enable row level security;

CREATE UNIQUE INDEX developer_loc_per_day_pkey ON public.developer_loc_per_day USING btree (id, user_id);

alter table "public"."developer_loc_per_day" add constraint "developer_loc_per_day_pkey" PRIMARY KEY using index "developer_loc_per_day_pkey";

alter table "public"."developer_loc_per_day" add constraint "developer_loc_per_day_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_loc_per_day" validate constraint "developer_loc_per_day_user_id_fkey";

grant delete on table "public"."developer_loc_per_day" to "anon";

grant insert on table "public"."developer_loc_per_day" to "anon";

grant references on table "public"."developer_loc_per_day" to "anon";

grant select on table "public"."developer_loc_per_day" to "anon";

grant trigger on table "public"."developer_loc_per_day" to "anon";

grant truncate on table "public"."developer_loc_per_day" to "anon";

grant update on table "public"."developer_loc_per_day" to "anon";

grant delete on table "public"."developer_loc_per_day" to "authenticated";

grant insert on table "public"."developer_loc_per_day" to "authenticated";

grant references on table "public"."developer_loc_per_day" to "authenticated";

grant select on table "public"."developer_loc_per_day" to "authenticated";

grant trigger on table "public"."developer_loc_per_day" to "authenticated";

grant truncate on table "public"."developer_loc_per_day" to "authenticated";

grant update on table "public"."developer_loc_per_day" to "authenticated";

grant delete on table "public"."developer_loc_per_day" to "service_role";

grant insert on table "public"."developer_loc_per_day" to "service_role";

grant references on table "public"."developer_loc_per_day" to "service_role";

grant select on table "public"."developer_loc_per_day" to "service_role";

grant trigger on table "public"."developer_loc_per_day" to "service_role";

grant truncate on table "public"."developer_loc_per_day" to "service_role";

grant update on table "public"."developer_loc_per_day" to "service_role";

create policy "Enable users to view their own data only"
on "public"."developer_loc_per_day"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



