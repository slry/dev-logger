create table "public"."team_invites" (
    "id" uuid not null default gen_random_uuid(),
    "team_id" uuid not null,
    "expires_after" timestamp with time zone not null default (now() + '00:15:00'::interval)
);


alter table "public"."team_invites" enable row level security;

CREATE UNIQUE INDEX team_invites_pkey ON public.team_invites USING btree (id, team_id);

alter table "public"."team_invites" add constraint "team_invites_pkey" PRIMARY KEY using index "team_invites_pkey";

alter table "public"."team_invites" add constraint "team_invites_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."team_invites" validate constraint "team_invites_team_id_fkey";

grant delete on table "public"."team_invites" to "anon";

grant insert on table "public"."team_invites" to "anon";

grant references on table "public"."team_invites" to "anon";

grant select on table "public"."team_invites" to "anon";

grant trigger on table "public"."team_invites" to "anon";

grant truncate on table "public"."team_invites" to "anon";

grant update on table "public"."team_invites" to "anon";

grant delete on table "public"."team_invites" to "authenticated";

grant insert on table "public"."team_invites" to "authenticated";

grant references on table "public"."team_invites" to "authenticated";

grant select on table "public"."team_invites" to "authenticated";

grant trigger on table "public"."team_invites" to "authenticated";

grant truncate on table "public"."team_invites" to "authenticated";

grant update on table "public"."team_invites" to "authenticated";

grant delete on table "public"."team_invites" to "service_role";

grant insert on table "public"."team_invites" to "service_role";

grant references on table "public"."team_invites" to "service_role";

grant select on table "public"."team_invites" to "service_role";

grant trigger on table "public"."team_invites" to "service_role";

grant truncate on table "public"."team_invites" to "service_role";

grant update on table "public"."team_invites" to "service_role";

create policy "Enable Insert for team owners"
on "public"."team_invites"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM developer_team
  WHERE ((developer_team.user_id = ( SELECT auth.uid() AS uid)) AND (developer_team.role = 'OWNER'::team_role) AND (developer_team.team_id = developer_team.team_id)))));



