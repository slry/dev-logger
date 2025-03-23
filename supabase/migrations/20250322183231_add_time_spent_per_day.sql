create table "public"."developer_time_spent_per_day" (
    "user_id" uuid not null,
    "date" date not null,
    "time_spent" bigint not null
);


alter table "public"."developer_time_spent_per_day" enable row level security;

CREATE UNIQUE INDEX developer_time_spent_per_day_pkey ON public.developer_time_spent_per_day USING btree (user_id, date);

alter table "public"."developer_time_spent_per_day" add constraint "developer_time_spent_per_day_pkey" PRIMARY KEY using index "developer_time_spent_per_day_pkey";

alter table "public"."developer_time_spent_per_day" add constraint "developer_time_spent_per_day_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_time_spent_per_day" validate constraint "developer_time_spent_per_day_user_id_fkey";

grant delete on table "public"."developer_time_spent_per_day" to "anon";

grant insert on table "public"."developer_time_spent_per_day" to "anon";

grant references on table "public"."developer_time_spent_per_day" to "anon";

grant select on table "public"."developer_time_spent_per_day" to "anon";

grant trigger on table "public"."developer_time_spent_per_day" to "anon";

grant truncate on table "public"."developer_time_spent_per_day" to "anon";

grant update on table "public"."developer_time_spent_per_day" to "anon";

grant delete on table "public"."developer_time_spent_per_day" to "authenticated";

grant insert on table "public"."developer_time_spent_per_day" to "authenticated";

grant references on table "public"."developer_time_spent_per_day" to "authenticated";

grant select on table "public"."developer_time_spent_per_day" to "authenticated";

grant trigger on table "public"."developer_time_spent_per_day" to "authenticated";

grant truncate on table "public"."developer_time_spent_per_day" to "authenticated";

grant update on table "public"."developer_time_spent_per_day" to "authenticated";

grant delete on table "public"."developer_time_spent_per_day" to "service_role";

grant insert on table "public"."developer_time_spent_per_day" to "service_role";

grant references on table "public"."developer_time_spent_per_day" to "service_role";

grant select on table "public"."developer_time_spent_per_day" to "service_role";

grant trigger on table "public"."developer_time_spent_per_day" to "service_role";

grant truncate on table "public"."developer_time_spent_per_day" to "service_role";

grant update on table "public"."developer_time_spent_per_day" to "service_role";


