create table "public"."personal_teams" (
    "user_id" uuid not null,
    "personal_team_id" uuid not null
);


alter table "public"."personal_teams" enable row level security;

CREATE UNIQUE INDEX personal_teams_personal_team_id_key ON public.personal_teams USING btree (personal_team_id);

CREATE UNIQUE INDEX personal_teams_pkey ON public.personal_teams USING btree (user_id);

alter table "public"."personal_teams" add constraint "personal_teams_pkey" PRIMARY KEY using index "personal_teams_pkey";

alter table "public"."personal_teams" add constraint "personal_teams_personal_team_id_fkey" FOREIGN KEY (personal_team_id) REFERENCES teams(id) not valid;

alter table "public"."personal_teams" validate constraint "personal_teams_personal_team_id_fkey";

alter table "public"."personal_teams" add constraint "personal_teams_personal_team_id_key" UNIQUE using index "personal_teams_personal_team_id_key";

alter table "public"."personal_teams" add constraint "personal_teams_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."personal_teams" validate constraint "personal_teams_user_id_fkey";

grant delete on table "public"."personal_teams" to "anon";

grant insert on table "public"."personal_teams" to "anon";

grant references on table "public"."personal_teams" to "anon";

grant select on table "public"."personal_teams" to "anon";

grant trigger on table "public"."personal_teams" to "anon";

grant truncate on table "public"."personal_teams" to "anon";

grant update on table "public"."personal_teams" to "anon";

grant delete on table "public"."personal_teams" to "authenticated";

grant insert on table "public"."personal_teams" to "authenticated";

grant references on table "public"."personal_teams" to "authenticated";

grant select on table "public"."personal_teams" to "authenticated";

grant trigger on table "public"."personal_teams" to "authenticated";

grant truncate on table "public"."personal_teams" to "authenticated";

grant update on table "public"."personal_teams" to "authenticated";

grant delete on table "public"."personal_teams" to "service_role";

grant insert on table "public"."personal_teams" to "service_role";

grant references on table "public"."personal_teams" to "service_role";

grant select on table "public"."personal_teams" to "service_role";

grant trigger on table "public"."personal_teams" to "service_role";

grant truncate on table "public"."personal_teams" to "service_role";

grant update on table "public"."personal_teams" to "service_role";

create policy "Enable users to view their own data only"
on "public"."personal_teams"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



