alter table "public"."api_tokens" drop constraint "api_tokens_user_id_fkey";

alter table "public"."developer_file_operations" drop constraint "developer_file_operations_user_id_fkey";

alter table "public"."developer_loc_per_day" drop constraint "developer_loc_per_day_user_id_fkey";

alter table "public"."developer_team" drop constraint "developer_team_team_id_fkey";

alter table "public"."developer_team" drop constraint "developer_team_user_id_fkey";

alter table "public"."developer_time_spent_per_day" drop constraint "developer_time_spent_per_day_user_id_fkey";

alter table "public"."developer_total_loc" drop constraint "developer_total_loc_user_id_fkey";

alter table "public"."integration_tokens" drop constraint "integration_tokens_user_id_fkey";

alter table "public"."personal_teams" drop constraint "personal_teams_personal_team_id_fkey";

alter table "public"."personal_teams" drop constraint "personal_teams_user_id_fkey";

alter table "public"."api_tokens" add constraint "api_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."api_tokens" validate constraint "api_tokens_user_id_fkey";

alter table "public"."developer_file_operations" add constraint "developer_file_operations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_file_operations" validate constraint "developer_file_operations_user_id_fkey";

alter table "public"."developer_loc_per_day" add constraint "developer_loc_per_day_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_loc_per_day" validate constraint "developer_loc_per_day_user_id_fkey";

alter table "public"."developer_team" add constraint "developer_team_team_id_fkey" FOREIGN KEY (team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_team" validate constraint "developer_team_team_id_fkey";

alter table "public"."developer_team" add constraint "developer_team_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_team" validate constraint "developer_team_user_id_fkey";

alter table "public"."developer_time_spent_per_day" add constraint "developer_time_spent_per_day_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_time_spent_per_day" validate constraint "developer_time_spent_per_day_user_id_fkey";

alter table "public"."developer_total_loc" add constraint "developer_total_loc_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."developer_total_loc" validate constraint "developer_total_loc_user_id_fkey";

alter table "public"."integration_tokens" add constraint "integration_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."integration_tokens" validate constraint "integration_tokens_user_id_fkey";

alter table "public"."personal_teams" add constraint "personal_teams_personal_team_id_fkey" FOREIGN KEY (personal_team_id) REFERENCES teams(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."personal_teams" validate constraint "personal_teams_personal_team_id_fkey";

alter table "public"."personal_teams" add constraint "personal_teams_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."personal_teams" validate constraint "personal_teams_user_id_fkey";


