create table "public"."gitlab_repos" (
    "url" text not null,
    "name" text not null default ''::text,
    "description" text not null default ''::text,
    "team_id" uuid not null
);


alter table "public"."gitlab_repos" enable row level security;

alter table "public"."teams" drop column "gitlab_repos";

CREATE UNIQUE INDEX gitlab_repos_pkey ON public.gitlab_repos USING btree (url, team_id);

alter table "public"."gitlab_repos" add constraint "gitlab_repos_pkey" PRIMARY KEY using index "gitlab_repos_pkey";

alter table "public"."gitlab_repos" add constraint "gitlab_repos_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."gitlab_repos" validate constraint "gitlab_repos_team_id_fkey";

grant delete on table "public"."gitlab_repos" to "anon";

grant insert on table "public"."gitlab_repos" to "anon";

grant references on table "public"."gitlab_repos" to "anon";

grant select on table "public"."gitlab_repos" to "anon";

grant trigger on table "public"."gitlab_repos" to "anon";

grant truncate on table "public"."gitlab_repos" to "anon";

grant update on table "public"."gitlab_repos" to "anon";

grant delete on table "public"."gitlab_repos" to "authenticated";

grant insert on table "public"."gitlab_repos" to "authenticated";

grant references on table "public"."gitlab_repos" to "authenticated";

grant select on table "public"."gitlab_repos" to "authenticated";

grant trigger on table "public"."gitlab_repos" to "authenticated";

grant truncate on table "public"."gitlab_repos" to "authenticated";

grant update on table "public"."gitlab_repos" to "authenticated";

grant delete on table "public"."gitlab_repos" to "service_role";

grant insert on table "public"."gitlab_repos" to "service_role";

grant references on table "public"."gitlab_repos" to "service_role";

grant select on table "public"."gitlab_repos" to "service_role";

grant trigger on table "public"."gitlab_repos" to "service_role";

grant truncate on table "public"."gitlab_repos" to "service_role";

grant update on table "public"."gitlab_repos" to "service_role";

create policy "Enable Insert for team owners"
on "public"."gitlab_repos"
as permissive
for insert
to authenticated
with check ((EXISTS ( SELECT 1
   FROM developer_team
  WHERE ((developer_team.user_id = ( SELECT auth.uid() AS uid)) AND (developer_team.role = 'OWNER'::team_role) AND (developer_team.team_id = developer_team.team_id)))));


create policy "Enable Select for team members"
on "public"."gitlab_repos"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM developer_team
  WHERE ((developer_team.user_id = ( SELECT auth.uid() AS uid)) AND (developer_team.team_id = developer_team.team_id)))));


create policy "Enable Update for team owners"
on "public"."gitlab_repos"
as permissive
for update
to public
using ((EXISTS ( SELECT 1
   FROM developer_team
  WHERE ((developer_team.user_id = ( SELECT auth.uid() AS uid)) AND (developer_team.role = 'OWNER'::team_role) AND (developer_team.team_id = developer_team.team_id)))));



