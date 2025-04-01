create policy "Enable users to view their own data only"
on "public"."developer_team"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."developer_time_spent_per_day"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable delete for users based on user_id"
on "public"."integration_tokens"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."integration_tokens"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their own data only"
on "public"."integration_tokens"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to view their teams only"
on "public"."teams"
as permissive
for select
to authenticated
using ((EXISTS ( SELECT 1
   FROM developer_team
  WHERE ((developer_team.team_id = teams.id) AND (developer_team.user_id = auth.uid())))));



