create policy "Enable Select for team owners"
on "public"."team_invites"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM developer_team
  WHERE ((developer_team.user_id = ( SELECT auth.uid() AS uid)) AND (developer_team.role = 'OWNER'::team_role) AND (developer_team.team_id = developer_team.team_id)))));



