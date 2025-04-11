DROP FUNCTION IF EXISTS public.get_team_members(uuid);

CREATE OR REPLACE FUNCTION public.get_team_members(team_id uuid)
 RETURNS TABLE(user_id uuid, role team_role, raw_user_metadata jsonb)
 LANGUAGE sql
 SECURITY DEFINER
AS $function$select
    tm.user_id,
    tm.role,
    u.raw_user_meta_data
  from developer_team tm
  join auth.users u on tm.user_id = u.id
  where tm.team_id = get_team_members.team_id;$function$
;

