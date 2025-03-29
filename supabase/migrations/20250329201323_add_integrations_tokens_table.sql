create type "public"."integration_provider" as enum ('TAIGA', 'GITLAB');

create table "public"."integration_tokens" (
    "user_id" uuid not null,
    "provider" integration_provider not null,
    "token" text
);


alter table "public"."integration_tokens" enable row level security;

CREATE UNIQUE INDEX integration_tokens_pkey ON public.integration_tokens USING btree (user_id, provider);

alter table "public"."integration_tokens" add constraint "integration_tokens_pkey" PRIMARY KEY using index "integration_tokens_pkey";

alter table "public"."integration_tokens" add constraint "integration_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."integration_tokens" validate constraint "integration_tokens_user_id_fkey";

grant delete on table "public"."integration_tokens" to "anon";

grant insert on table "public"."integration_tokens" to "anon";

grant references on table "public"."integration_tokens" to "anon";

grant select on table "public"."integration_tokens" to "anon";

grant trigger on table "public"."integration_tokens" to "anon";

grant truncate on table "public"."integration_tokens" to "anon";

grant update on table "public"."integration_tokens" to "anon";

grant delete on table "public"."integration_tokens" to "authenticated";

grant insert on table "public"."integration_tokens" to "authenticated";

grant references on table "public"."integration_tokens" to "authenticated";

grant select on table "public"."integration_tokens" to "authenticated";

grant trigger on table "public"."integration_tokens" to "authenticated";

grant truncate on table "public"."integration_tokens" to "authenticated";

grant update on table "public"."integration_tokens" to "authenticated";

grant delete on table "public"."integration_tokens" to "service_role";

grant insert on table "public"."integration_tokens" to "service_role";

grant references on table "public"."integration_tokens" to "service_role";

grant select on table "public"."integration_tokens" to "service_role";

grant trigger on table "public"."integration_tokens" to "service_role";

grant truncate on table "public"."integration_tokens" to "service_role";

grant update on table "public"."integration_tokens" to "service_role";


