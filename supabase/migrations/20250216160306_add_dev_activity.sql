create table "public"."developer_total_loc" (
    "user_id" uuid not null,
    "filename" text not null default ''::text,
    "loc_added" bigint,
    "loc_removed" bigint
);


alter table "public"."developer_total_loc" enable row level security;

CREATE UNIQUE INDEX developer_total_loc_pkey ON public.developer_total_loc USING btree (user_id, filename);

alter table "public"."developer_total_loc" add constraint "developer_total_loc_pkey" PRIMARY KEY using index "developer_total_loc_pkey";

alter table "public"."developer_total_loc" add constraint "developer_total_loc_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_total_loc" validate constraint "developer_total_loc_user_id_fkey";

grant delete on table "public"."developer_total_loc" to "anon";

grant insert on table "public"."developer_total_loc" to "anon";

grant references on table "public"."developer_total_loc" to "anon";

grant select on table "public"."developer_total_loc" to "anon";

grant trigger on table "public"."developer_total_loc" to "anon";

grant truncate on table "public"."developer_total_loc" to "anon";

grant update on table "public"."developer_total_loc" to "anon";

grant delete on table "public"."developer_total_loc" to "authenticated";

grant insert on table "public"."developer_total_loc" to "authenticated";

grant references on table "public"."developer_total_loc" to "authenticated";

grant select on table "public"."developer_total_loc" to "authenticated";

grant trigger on table "public"."developer_total_loc" to "authenticated";

grant truncate on table "public"."developer_total_loc" to "authenticated";

grant update on table "public"."developer_total_loc" to "authenticated";

grant delete on table "public"."developer_total_loc" to "service_role";

grant insert on table "public"."developer_total_loc" to "service_role";

grant references on table "public"."developer_total_loc" to "service_role";

grant select on table "public"."developer_total_loc" to "service_role";

grant trigger on table "public"."developer_total_loc" to "service_role";

grant truncate on table "public"."developer_total_loc" to "service_role";

grant update on table "public"."developer_total_loc" to "service_role";

create policy "Enable Insert for anon"
on "public"."developer_total_loc"
as permissive
for insert
to anon
with check (true);


create policy "Enable users to view their own data only"
on "public"."developer_total_loc"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



