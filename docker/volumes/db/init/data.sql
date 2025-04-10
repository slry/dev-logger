

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."file_operation" AS ENUM (
    'DELETE',
    'CREATE',
    'EDIT'
);


ALTER TYPE "public"."file_operation" OWNER TO "postgres";


CREATE TYPE "public"."integration_provider" AS ENUM (
    'TAIGA',
    'GITLAB'
);


ALTER TYPE "public"."integration_provider" OWNER TO "postgres";


CREATE TYPE "public"."team_role" AS ENUM (
    'OWNER',
    'DEVELOPER'
);


ALTER TYPE "public"."team_role" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."api_tokens" (
    "id" bigint NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "key" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "expires_at" "date" DEFAULT "now"() NOT NULL,
    "team_id" "uuid" NOT NULL
);


ALTER TABLE "public"."api_tokens" OWNER TO "postgres";


ALTER TABLE "public"."api_tokens" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."api_tokens_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."developer_file_operations" (
    "user_id" "uuid" NOT NULL,
    "filename" "text" DEFAULT ''::"text" NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    "operation" "public"."file_operation" NOT NULL,
    "team_id" "uuid" NOT NULL
);


ALTER TABLE "public"."developer_file_operations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."developer_loc_per_day" (
    "user_id" "uuid" NOT NULL,
    "datetime" timestamp with time zone DEFAULT "now"() NOT NULL,
    "loc_added" bigint DEFAULT '0'::bigint NOT NULL,
    "loc_removed" bigint DEFAULT '0'::bigint NOT NULL,
    "team_id" "uuid" NOT NULL
);


ALTER TABLE "public"."developer_loc_per_day" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."developer_loc_per_file" (
    "user_id" "uuid" NOT NULL,
    "filename" "text" DEFAULT ''::"text" NOT NULL,
    "loc_added" bigint DEFAULT '0'::bigint NOT NULL,
    "loc_removed" bigint DEFAULT '0'::bigint NOT NULL,
    "team_id" "uuid" NOT NULL
);


ALTER TABLE "public"."developer_loc_per_file" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."developer_team" (
    "team_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role" "public"."team_role" DEFAULT 'DEVELOPER'::"public"."team_role" NOT NULL
);


ALTER TABLE "public"."developer_team" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."developer_time_spent_per_day" (
    "user_id" "uuid" NOT NULL,
    "date" "date" NOT NULL,
    "time_spent" bigint NOT NULL,
    "team_id" "uuid" NOT NULL
);


ALTER TABLE "public"."developer_time_spent_per_day" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."integration_tokens" (
    "user_id" "uuid" NOT NULL,
    "provider" "public"."integration_provider" NOT NULL,
    "token" "text"
);


ALTER TABLE "public"."integration_tokens" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."personal_teams" (
    "user_id" "uuid" NOT NULL,
    "personal_team_id" "uuid" NOT NULL
);


ALTER TABLE "public"."personal_teams" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."teams" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "icon" "text" NOT NULL
);


ALTER TABLE "public"."teams" OWNER TO "postgres";


ALTER TABLE ONLY "public"."api_tokens"
    ADD CONSTRAINT "api_tokens_pkey" PRIMARY KEY ("id", "user_id", "team_id");



ALTER TABLE ONLY "public"."developer_file_operations"
    ADD CONSTRAINT "developer_file_operations_pkey" PRIMARY KEY ("operation", "filename", "team_id");



ALTER TABLE ONLY "public"."developer_loc_per_day"
    ADD CONSTRAINT "developer_loc_per_day_pkey" PRIMARY KEY ("datetime", "team_id");



ALTER TABLE ONLY "public"."developer_loc_per_file"
    ADD CONSTRAINT "developer_loc_per_file_pkey" PRIMARY KEY ("user_id", "filename", "team_id");



ALTER TABLE ONLY "public"."developer_team"
    ADD CONSTRAINT "developer_team_pkey" PRIMARY KEY ("team_id", "user_id");



ALTER TABLE ONLY "public"."developer_time_spent_per_day"
    ADD CONSTRAINT "developer_time_spent_per_day_pkey" PRIMARY KEY ("date", "user_id", "team_id");



ALTER TABLE ONLY "public"."integration_tokens"
    ADD CONSTRAINT "integration_tokens_pkey" PRIMARY KEY ("user_id", "provider");



ALTER TABLE ONLY "public"."personal_teams"
    ADD CONSTRAINT "personal_teams_personal_team_id_key" UNIQUE ("personal_team_id");



ALTER TABLE ONLY "public"."personal_teams"
    ADD CONSTRAINT "personal_teams_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."teams"
    ADD CONSTRAINT "teams_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."api_tokens"
    ADD CONSTRAINT "api_tokens_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."api_tokens"
    ADD CONSTRAINT "api_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_file_operations"
    ADD CONSTRAINT "developer_file_operations_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_file_operations"
    ADD CONSTRAINT "developer_file_operations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_loc_per_day"
    ADD CONSTRAINT "developer_loc_per_day_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_loc_per_day"
    ADD CONSTRAINT "developer_loc_per_day_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_team"
    ADD CONSTRAINT "developer_team_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_team"
    ADD CONSTRAINT "developer_team_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_time_spent_per_day"
    ADD CONSTRAINT "developer_time_spent_per_day_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_time_spent_per_day"
    ADD CONSTRAINT "developer_time_spent_per_day_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_loc_per_file"
    ADD CONSTRAINT "developer_total_loc_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."developer_loc_per_file"
    ADD CONSTRAINT "developer_total_loc_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."integration_tokens"
    ADD CONSTRAINT "integration_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."personal_teams"
    ADD CONSTRAINT "personal_teams_personal_team_id_fkey" FOREIGN KEY ("personal_team_id") REFERENCES "public"."teams"("id");



ALTER TABLE ONLY "public"."personal_teams"
    ADD CONSTRAINT "personal_teams_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



CREATE POLICY "Enable delete for users based on user_id" ON "public"."api_tokens" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable delete for users based on user_id" ON "public"."integration_tokens" FOR DELETE USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."api_tokens" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable insert for users based on user_id" ON "public"."integration_tokens" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."api_tokens" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."developer_file_operations" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."developer_loc_per_day" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."developer_loc_per_file" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."developer_team" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."developer_time_spent_per_day" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."integration_tokens" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their own data only" ON "public"."personal_teams" FOR SELECT TO "authenticated" USING ((( SELECT "auth"."uid"() AS "uid") = "user_id"));



CREATE POLICY "Enable users to view their teams only" ON "public"."teams" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "public"."developer_team"
  WHERE (("developer_team"."team_id" = "teams"."id") AND ("developer_team"."user_id" = "auth"."uid"())))));



ALTER TABLE "public"."api_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."developer_file_operations" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."developer_loc_per_day" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."developer_loc_per_file" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."developer_team" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."developer_time_spent_per_day" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."integration_tokens" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."personal_teams" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."teams" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
































































































































































































GRANT ALL ON TABLE "public"."api_tokens" TO "anon";
GRANT ALL ON TABLE "public"."api_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."api_tokens" TO "service_role";



GRANT ALL ON SEQUENCE "public"."api_tokens_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."api_tokens_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."api_tokens_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."developer_file_operations" TO "anon";
GRANT ALL ON TABLE "public"."developer_file_operations" TO "authenticated";
GRANT ALL ON TABLE "public"."developer_file_operations" TO "service_role";



GRANT ALL ON TABLE "public"."developer_loc_per_day" TO "anon";
GRANT ALL ON TABLE "public"."developer_loc_per_day" TO "authenticated";
GRANT ALL ON TABLE "public"."developer_loc_per_day" TO "service_role";



GRANT ALL ON TABLE "public"."developer_loc_per_file" TO "anon";
GRANT ALL ON TABLE "public"."developer_loc_per_file" TO "authenticated";
GRANT ALL ON TABLE "public"."developer_loc_per_file" TO "service_role";



GRANT ALL ON TABLE "public"."developer_team" TO "anon";
GRANT ALL ON TABLE "public"."developer_team" TO "authenticated";
GRANT ALL ON TABLE "public"."developer_team" TO "service_role";



GRANT ALL ON TABLE "public"."developer_time_spent_per_day" TO "anon";
GRANT ALL ON TABLE "public"."developer_time_spent_per_day" TO "authenticated";
GRANT ALL ON TABLE "public"."developer_time_spent_per_day" TO "service_role";



GRANT ALL ON TABLE "public"."integration_tokens" TO "anon";
GRANT ALL ON TABLE "public"."integration_tokens" TO "authenticated";
GRANT ALL ON TABLE "public"."integration_tokens" TO "service_role";



GRANT ALL ON TABLE "public"."personal_teams" TO "anon";
GRANT ALL ON TABLE "public"."personal_teams" TO "authenticated";
GRANT ALL ON TABLE "public"."personal_teams" TO "service_role";



GRANT ALL ON TABLE "public"."teams" TO "anon";
GRANT ALL ON TABLE "public"."teams" TO "authenticated";
GRANT ALL ON TABLE "public"."teams" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;

--
-- Dumped schema changes for auth and storage
--

