create table "public"."developer_create_file" (
    "user_id" uuid not null,
    "filename" text not null default ''::text,
    "timestamp" timestamp with time zone not null
);


alter table "public"."developer_create_file" enable row level security;

create table "public"."developer_delete_file" (
    "user_id" uuid not null,
    "filename" text not null default ''::text,
    "timestamp" timestamp without time zone not null
);


alter table "public"."developer_delete_file" enable row level security;

CREATE UNIQUE INDEX developer_create_file_pkey ON public.developer_create_file USING btree (user_id);

CREATE UNIQUE INDEX developer_delete_file_pkey ON public.developer_delete_file USING btree (user_id);

alter table "public"."developer_create_file" add constraint "developer_create_file_pkey" PRIMARY KEY using index "developer_create_file_pkey";

alter table "public"."developer_delete_file" add constraint "developer_delete_file_pkey" PRIMARY KEY using index "developer_delete_file_pkey";

alter table "public"."developer_create_file" add constraint "developer_create_file_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_create_file" validate constraint "developer_create_file_user_id_fkey";

alter table "public"."developer_delete_file" add constraint "developer_delete_file_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."developer_delete_file" validate constraint "developer_delete_file_user_id_fkey";

grant delete on table "public"."developer_create_file" to "anon";

grant insert on table "public"."developer_create_file" to "anon";

grant references on table "public"."developer_create_file" to "anon";

grant select on table "public"."developer_create_file" to "anon";

grant trigger on table "public"."developer_create_file" to "anon";

grant truncate on table "public"."developer_create_file" to "anon";

grant update on table "public"."developer_create_file" to "anon";

grant delete on table "public"."developer_create_file" to "authenticated";

grant insert on table "public"."developer_create_file" to "authenticated";

grant references on table "public"."developer_create_file" to "authenticated";

grant select on table "public"."developer_create_file" to "authenticated";

grant trigger on table "public"."developer_create_file" to "authenticated";

grant truncate on table "public"."developer_create_file" to "authenticated";

grant update on table "public"."developer_create_file" to "authenticated";

grant delete on table "public"."developer_create_file" to "service_role";

grant insert on table "public"."developer_create_file" to "service_role";

grant references on table "public"."developer_create_file" to "service_role";

grant select on table "public"."developer_create_file" to "service_role";

grant trigger on table "public"."developer_create_file" to "service_role";

grant truncate on table "public"."developer_create_file" to "service_role";

grant update on table "public"."developer_create_file" to "service_role";

grant delete on table "public"."developer_delete_file" to "anon";

grant insert on table "public"."developer_delete_file" to "anon";

grant references on table "public"."developer_delete_file" to "anon";

grant select on table "public"."developer_delete_file" to "anon";

grant trigger on table "public"."developer_delete_file" to "anon";

grant truncate on table "public"."developer_delete_file" to "anon";

grant update on table "public"."developer_delete_file" to "anon";

grant delete on table "public"."developer_delete_file" to "authenticated";

grant insert on table "public"."developer_delete_file" to "authenticated";

grant references on table "public"."developer_delete_file" to "authenticated";

grant select on table "public"."developer_delete_file" to "authenticated";

grant trigger on table "public"."developer_delete_file" to "authenticated";

grant truncate on table "public"."developer_delete_file" to "authenticated";

grant update on table "public"."developer_delete_file" to "authenticated";

grant delete on table "public"."developer_delete_file" to "service_role";

grant insert on table "public"."developer_delete_file" to "service_role";

grant references on table "public"."developer_delete_file" to "service_role";

grant select on table "public"."developer_delete_file" to "service_role";

grant trigger on table "public"."developer_delete_file" to "service_role";

grant truncate on table "public"."developer_delete_file" to "service_role";

grant update on table "public"."developer_delete_file" to "service_role";


