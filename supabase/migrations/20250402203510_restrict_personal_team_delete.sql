alter table "public"."personal_teams" drop constraint "personal_teams_personal_team_id_fkey";

alter table "public"."personal_teams" add constraint "personal_teams_personal_team_id_fkey" FOREIGN KEY (personal_team_id) REFERENCES teams(id) not valid;

alter table "public"."personal_teams" validate constraint "personal_teams_personal_team_id_fkey";


